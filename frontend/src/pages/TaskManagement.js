import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  getUsers,
  getCompanies,
  createTask,
  getAdminTasks,
  updateTaskStatus,
  adminCompleteTask
} from "../services/taskService";

export default function TaskManagement() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    company_id: "",
    content_type: "",
    remark: ""
  });

  // LOAD DATA
  const loadData = async () => {
    try {
      const u = await getUsers();
      const c = await getCompanies();
      const t = await getAdminTasks();

      setUsers(Array.isArray(u.data) ? u.data : []);
      setCompanies(Array.isArray(c.data) ? c.data : []);
      setTasks(Array.isArray(t.data) ? t.data : []);

    } catch (error) {
      console.error("Load error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ADMIN TOGGLE (assigned <-> completed)
  const toggleStatus = async (task) => {
    if (task.status === "doing") {
      alert("User is doing the task. Admin cannot change now.");
      return;
    }

    const newStatus = task.status === "assigned" ? "completed" : "assigned";

    try {
      await updateTaskStatus(task.id, { status: newStatus });
      loadData();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status");
    }
  };

  // ADMIN COMPLETES SUBMITTED TASK
  const handleAdminComplete = async (taskId) => {
    try {
      await adminCompleteTask(taskId);
      loadData();
    } catch (err) {
      console.error("Admin complete error:", err);
      alert("Failed to complete task");
    }
  };

  // CREATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask({
      ...form,
      status: "assigned"
    });

    alert("Task Assigned Successfully!");

    setForm({ user_id: "", company_id: "", content_type: "", remark: "" });

    loadData();
  };

  // UI Colors
  const primaryBlue = "#0d6efd";
  const lightGray = "#f8f9fa";
  const borderColor = "#dee2e6";

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fff" }}>

      {/* SIDEBAR */}
      <div style={{
        width: 260, backgroundColor: "#1a1d23", color: "#fff",
        padding: "30px 20px", position: "fixed", height: "100vh"
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: primaryBlue }}>
          AdminPanel
        </h2>

        <div onClick={() => navigate("/admin-dashboard")} style={sideLink}>Dashboard</div>
        <div onClick={() => navigate("/users")} style={sideLink}>All Users</div>

        <div style={{ ...sideLink, background: primaryBlue, color: "#fff", borderRadius: 8 }}>
          Task Management
        </div>

        <div onClick={logout} style={logoutBtn}>Logout ⏻</div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: 260, flex: 1, padding: "40px 50px" }}>
        <h1 style={{ fontWeight: 700, marginBottom: 30 }}>Task Management</h1>

        {/* ASSIGN TASK FORM */}
        <div style={formCard}>
          <h2>Assign New Task</h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15 }}
          >
            <select style={inputStyle} value={form.user_id}
              onChange={e => setForm({ ...form, user_id: e.target.value })} required>
              <option value="">Select User</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>

            <select style={inputStyle} value={form.company_id}
              onChange={e => setForm({ ...form, company_id: e.target.value })} required>
              <option value="">Select Client</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <select style={inputStyle} value={form.content_type}
              onChange={e => setForm({ ...form, content_type: e.target.value })} required>
              <option value="">Type</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="post">Post</option>
              <option value="reel">Reel</option>
            </select>

            <input style={{ ...inputStyle, gridColumn: "span 3" }}
              placeholder="Remark"
              value={form.remark}
              onChange={e => setForm({ ...form, remark: e.target.value })}
            />

            <button type="submit" style={submitBtn}>Assign Task</button>
          </form>
        </div>

        {/* TASK TABLE */}
        <div style={tableCard}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: lightGray }}>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Client</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Remark</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map(task => (
                <tr key={task.id} style={{ borderTop: `1px solid ${borderColor}` }}>

                  <td style={tdStyle}>{task.user?.name}</td>
                  <td style={tdStyle}>{task.company?.name}</td>
                  <td style={tdStyle}>{task.content_type}</td>
                  <td style={tdStyle}>{task.remark}</td>

                  <td style={tdStyle}>
                    {task.status === "assigned" && <span style={badgeAssigned}>Assigned</span>}
                    {task.status === "doing" && <span style={badgeDoing}>Doing</span>}
                    {task.status === "submitted" && <span style={badgeSubmitted}>Submitted</span>}
                    {task.status === "completed" && <span style={badgeDone}>Completed</span>}
                  </td>

                  <td style={tdStyle}>
                    {/* Admin action for submitted */}
                    {task.status === "submitted" && (
                      <button
                        onClick={() => handleAdminComplete(task.id)}
                        style={toggleBtn}
                      >
                        Mark Completed
                      </button>
                    )}

                    {/* Admin toggle assigned/completed */}
                    {task.status !== "doing" && task.status !== "submitted" && (
                      <button
                        onClick={() => toggleStatus(task)}
                        style={toggleBtn}
                      >
                        {task.status === "assigned" ? "Mark Completed" : "Mark Assigned"}
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* STYLES */
const sideLink = { padding: "12px 15px", cursor: "pointer", color: "#adb5bd" };

const logoutBtn = {
  padding: "12px 15px",
  color: "#ff4d4d",
  cursor: "pointer",
  marginTop: 40,
  borderTop: "1px solid #333"
};

const formCard = {
  backgroundColor: "#f8f9fa",
  padding: 25,
  borderRadius: 12,
  border: "1px solid #dee2e6",
  marginBottom: 40
};

const tableCard = {
  backgroundColor: "#fff",
  borderRadius: 12,
  border: "1px solid #dee2e6"
};

const inputStyle = {
  padding: "12px",
  borderRadius: 6,
  border: "1px solid #ced4da"
};

const submitBtn = {
  gridColumn: "span 3",
  backgroundColor: "#0d6efd",
  color: "#fff",
  padding: "10px 25px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontWeight: 600
};

const thStyle = { padding: "15px 20px", fontSize: 14, fontWeight: 600 };
const tdStyle = { padding: "18px 20px", fontSize: 15 };

const badgeAssigned = { padding: "4px 8px", background: "#0d6efd33", color: "#0d6efd", borderRadius: 5 };
const badgeDoing = { padding: "4px 8px", background: "#ffc10733", color: "#b88600", borderRadius: 5 };
const badgeSubmitted = { padding: "4px 8px", background: "#17a2b833", color: "#0d728f", borderRadius: 5 };
const badgeDone = { padding: "4px 8px", background: "#19875433", color: "#198754", borderRadius: 5 };

const toggleBtn = {
  padding: "6px 12px",
  backgroundColor: "#6c63ff",
  color: "#fff",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontWeight: 600
};

