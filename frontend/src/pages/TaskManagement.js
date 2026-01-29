import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  getUsers,
  getCompanies,
  createTask,
  getAdminTasks,
  updateTaskStatus
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
      setUsers([]);
      setCompanies([]);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ADMIN TOGGLE STATUS (assigned <-> completed)
  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === "assigned" ? "completed" : "assigned";

      await updateTaskStatus(task.id, { status: newStatus });

      loadData();
    } catch (err) {
      console.error("Status Update Error:", err);
      alert("Failed to update status");
    }
  };

  // CREATE NEW TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask({
      ...form,
      status: "assigned"
    });

    alert("Task Assigned Successfully!");

    setForm({
      user_id: "",
      company_id: "",
      content_type: "",
      remark: ""
    });

    loadData();
  };

  const primaryBlue = "#0d6efd";
  const lightGray = "#f8f9fa";
  const borderColor = "#dee2e6";

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fff" }}>

      {/* SIDEBAR */}
      <div style={{
        width: 260,
        backgroundColor: "#1a1d23",
        color: "#fff",
        padding: "30px 20px",
        position: "fixed",
        height: "100vh"
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: primaryBlue }}>
          AdminPanel
        </h2>

        <div
          style={{ padding: "12px 15px", cursor: "pointer", color: "#adb5bd" }}
          onClick={() => navigate("/admin-dashboard")}
        >
          Dashboard
        </div>

        <div
          style={{ padding: "12px 15px", cursor: "pointer", color: "#adb5bd" }}
          onClick={() => navigate("/users")}
        >
          All Users
        </div>

        <div
          style={{
            padding: "12px 15px",
            background: primaryBlue,
            color: "#fff",
            borderRadius: 8,
            marginTop: 10
          }}
        >
          Task Management
        </div>

        <div
          onClick={logout}
          style={{
            padding: "12px 15px",
            color: "#ff4d4d",
            cursor: "pointer",
            marginTop: 40,
            borderTop: "1px solid #333"
          }}
        >
          Logout ⏻
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: 260, flex: 1, padding: "40px 50px" }}>
        <h1 style={{ fontWeight: 700, marginBottom: 30 }}>Task Management</h1>

        {/* ASSIGN NEW TASK FORM */}
        <div style={{
          backgroundColor: lightGray,
          padding: 25,
          borderRadius: 12,
          marginBottom: 40,
          border: `1px solid ${borderColor}`
        }}>
          <h2 style={{ marginBottom: 20 }}>Assign New Task</h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15 }}
          >
            <select
              style={inputStyle}
              value={form.user_id}
              onChange={(e) => setForm({ ...form, user_id: e.target.value })}
              required
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>

            <select
              style={inputStyle}
              value={form.company_id}
              onChange={(e) => setForm({ ...form, company_id: e.target.value })}
              required
            >
              <option value="">Select Client</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select
              style={inputStyle}
              value={form.content_type}
              onChange={(e) => setForm({ ...form, content_type: e.target.value })}
              required
            >
              <option value="">Content Type</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="post">Post</option>
              <option value="reel">Reel</option>
            </select>

            <input
              style={{ ...inputStyle, gridColumn: "span 3" }}
              placeholder="Remark"
              value={form.remark}
              onChange={(e) => setForm({ ...form, remark: e.target.value })}
            />

            <div style={{ gridColumn: "span 3", marginTop: 10 }}>
              <button type="submit" style={submitBtn}>Assign Task</button>
            </div>
          </form>
        </div>

        {/* TASK TABLE */}
        <div style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: `1px solid ${borderColor}`
        }}>
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
              {tasks.map((t) => (
                <tr key={t.id} style={{ borderTop: `1px solid ${borderColor}` }}>
                  <td style={tdStyle}>{t.user?.name}</td>
                  <td style={tdStyle}>{t.company?.name}</td>
                  <td style={tdStyle}>{t.content_type}</td>
                  <td style={tdStyle}>{t.remark}</td>

                  <td style={tdStyle}>
                    {t.status === "assigned" && <span style={badgeAssigned}>Assigned</span>}
                    {t.status === "doing" && <span style={badgeDoing}>Doing</span>}
                    {t.status === "completed" && <span style={badgeDone}>Completed</span>}
                  </td>

                  <td style={tdStyle}>
                    {t.status !== "doing" && (
                      <button
                        onClick={() => toggleStatus(t)}
                        style={toggleBtn}
                      >
                        {t.status === "assigned" ? "Mark Completed" : "Mark Assigned"}
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
const inputStyle = {
  padding: "12px",
  borderRadius: 6,
  border: "1px solid #ced4da",
  outline: "none"
};

const submitBtn = {
  backgroundColor: "#0d6efd",
  color: "white",
  border: "none",
  padding: "10px 25px",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600
};

const thStyle = {
  padding: "15px 20px",
  fontSize: 14,
  fontWeight: 600,
  color: "#495057"
};

const tdStyle = {
  padding: "18px 20px",
  fontSize: 15
};

const badgeAssigned = {
  padding: "4px 8px",
  backgroundColor: "#0d6efd33",
  color: "#0d6efd",
  borderRadius: 5,
  fontWeight: 600
};

const badgeDoing = {
  padding: "4px 8px",
  backgroundColor: "#ffc10733",
  color: "#b88600",
  borderRadius: 5,
  fontWeight: 600
};

const badgeDone = {
  padding: "4px 8px",
  backgroundColor: "#19875433",
  color: "#198754",
  borderRadius: 5,
  fontWeight: 600
};

const toggleBtn = {
  padding: "6px 12px",
  backgroundColor: "#6c63ff",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600
};
