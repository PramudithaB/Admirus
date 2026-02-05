import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  // Data States
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Filter & UI States
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Format: YYYY-MM
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    company_id: "",
    content_type: "",
    remark: ""
  });

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

  // FILTER LOGIC: Get tasks for specific user AND specific month
  const filteredTasks = tasks.filter((task) => {
    const matchesUser = task.user_id?.toString() === selectedUserId?.toString();
    const matchesMonth = task.created_at ? task.created_at.startsWith(selectedMonth) : true;
    return matchesUser && matchesMonth;
  });

  const selectedUserName = users.find(u => u.id?.toString() === selectedUserId?.toString())?.name;

  // PDF GENERATION
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Task Management Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`User: ${selectedUserName}`, 14, 30);
    doc.text(`Month: ${selectedMonth}`, 14, 37);

    const tableColumn = ["Client", "Type", "Remark", "Status", "Date"];
    const tableRows = filteredTasks.map(task => [
      task.company?.name || "N/A",
      task.content_type,
      task.remark,
      task.status,
      task.created_at ? task.created_at.slice(0, 10) : "N/A"
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid'
    });

    doc.save(`Report_${selectedUserName}_${selectedMonth}.pdf`);
  };

  // Actions
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
      alert("Failed to update status");
    }
  };

  const handleAdminComplete = async (taskId) => {
    try {
      await adminCompleteTask(taskId);
      loadData();
    } catch (err) {
      alert("Failed to complete task");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ ...form, status: "assigned" });
    alert("Task Assigned Successfully!");
    setForm({ user_id: "", company_id: "", content_type: "", remark: "" });
    loadData();
  };

  // UI Constants
  const primaryBlue = "#0d6efd";
  const lightGray = "#f8f9fa";
  const borderColor = "#dee2e6";

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* SIDEBAR */}
      <div style={sidebarStyle}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: primaryBlue }}>
          AdminPanel
        </h2>
        <div onClick={() => navigate("/admin-dashboard")} style={sideLink}>Dashboard</div>
        {/* <div onClick={() => navigate("/users")} style={sideLink}>All Users</div> */}
        
        <div 
          style={{ position: "relative" }} 
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div style={{ 
            ...sideLink, 
            background: isDropdownOpen || selectedUserId ? "#343a40" : "transparent",
            borderRadius: "8px 8px 0 0",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between"
          }}>
            Task Management <span>{isDropdownOpen ? "▴" : "▾"}</span>
          </div>
          
          {isDropdownOpen && (
            <div style={dropdownContainer}>
              {users.map(u => (
                <div 
                  key={u.id} 
                  style={{ 
                    ...dropdownItem, 
                    backgroundColor: selectedUserId === u.id ? primaryBlue : "transparent" 
                  }}
                  onClick={() => setSelectedUserId(u.id)}
                >
                  {u.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div onClick={logout} style={logoutBtn}>Logout ⏻</div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: 260, flex: 1, padding: "40px 50px" }}>
        <h1 style={{ fontWeight: 700, marginBottom: 30 }}>Task Management</h1>

        {/* ASSIGN TASK FORM */}
        <div style={formCard}>
          <h2 style={{ marginBottom: 20 }}>Assign New Task</h2>
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15 }}>
            <select style={inputStyle} value={form.user_id} onChange={e => setForm({ ...form, user_id: e.target.value })} required>
              <option value="">Select User</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <select style={inputStyle} value={form.company_id} onChange={e => setForm({ ...form, company_id: e.target.value })} required>
              <option value="">Select Client</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select style={inputStyle} value={form.content_type} onChange={e => setForm({ ...form, content_type: e.target.value })} required>
              <option value="">Type</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="post">Post</option>
              <option value="reel">Reel</option>
            </select>
            <input style={{ ...inputStyle, gridColumn: "span 3" }} placeholder="Remark" value={form.remark} onChange={e => setForm({ ...form, remark: e.target.value })} />
            <button type="submit" style={submitBtn}>Assign Task</button>
          </form>
        </div>

        {/* SELECTED USER VIEW */}
        {selectedUserId ? (
          <div>
            <div style={headerActionRow}>
              <div style={userHeaderStyle}>
                <span style={userAvatarStyle}>{selectedUserName?.charAt(0).toUpperCase()}</span>
                <h3 style={{ margin: 0 }}>{selectedUserName}'s Tasks</h3>
              </div>
              
              <div style={{ display: "flex", gap: "10px" }}>
                <input 
                  type="month" 
                  style={inputStyle} 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(e.target.value)} 
                />
                {/* <button onClick={downloadPDF} style={pdfBtn}>Download PDF Report</button> */}
              </div>
            </div>

            <div style={tableCard}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: lightGray }}>
                    <th style={thStyle}>Client</th>
                    <th style={thStyle}>Type</th>
                    <th style={thStyle}>Remark</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <tr key={task.id} style={{ borderTop: `1px solid ${borderColor}` }}>
                        <td style={tdStyle}>{task.company?.name}</td>
                        <td style={tdStyle}>{task.content_type}</td>
                        <td style={tdStyle}>{task.remark}</td>
                        <td style={tdStyle}>
                          <span style={getBadgeStyle(task.status)}>{task.status}</span>
                        </td>
                        <td style={tdStyle}>
                          {task.status === "submitted" && (
                            <button onClick={() => handleAdminComplete(task.id)} style={toggleBtn}>
                              Complete
                            </button>
                          )}
                          {task.status !== "doing" && task.status !== "submitted" && (
                            <button onClick={() => toggleStatus(task)} style={toggleBtn}>
                              {task.status === "assigned" ? "Finish" : "Diliver to Post"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ padding: 40, textAlign: "center", color: "#000" }}>
                        No tasks found for this month.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 50, border: `2px dashed ${borderColor}`, borderRadius: 12 }}>
            <p style={{ color: "#666", fontSize: 18 }}>Please select a user from the sidebar to view their tasks.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* STYLES */
const sidebarStyle = {
  width: 260, backgroundColor: "#1a1d23", color: "#fff",
  padding: "30px 20px", position: "fixed", height: "100vh", zIndex: 100
};

const sideLink = { padding: "12px 15px", cursor: "pointer", color: "#adb5bd", transition: "0.3s" };

const dropdownContainer = {
  backgroundColor: "#252930", borderRadius: "0 0 8px 8px", padding: "5px 0",
  maxHeight: "250px", overflowY: "auto", border: "1px solid #333"
};

const dropdownItem = {
  padding: "10px 20px", cursor: "pointer", fontSize: 14, color: "#fff",
  borderBottom: "1px solid #2d323b"
};

const logoutBtn = {
  padding: "12px 15px", color: "#ff4d4d", cursor: "pointer",
  marginTop: 40, borderTop: "1px solid #333"
};

const formCard = {
  backgroundColor: "#f8f9fa", padding: 25, borderRadius: 12,
  border: "1px solid #dee2e6", marginBottom: 40
};

const headerActionRow = {
  display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20
};

const userHeaderStyle = { display: "flex", alignItems: "center", gap: "12px" };

const userAvatarStyle = {
  width: 35, height: 35, backgroundColor: "#0d6efd", color: "white",
  borderRadius: "50%", display: "flex", alignItems: "center",
  justifyContent: "center", fontWeight: "bold"
};

const tableCard = {
  backgroundColor: "#fff", borderRadius: 12, border: "1px solid #dee2e6", overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const inputStyle = { padding: "10px", borderRadius: 6, border: "1px solid #ced4da" };

const submitBtn = {
  gridColumn: "span 3", backgroundColor: "#0d6efd", color: "#fff",
  padding: "12px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600
};

const pdfBtn = {
  backgroundColor: "#198754", color: "#fff", padding: "10px 20px",
  borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600
};

const thStyle = { padding: "15px 20px", fontSize: 14, fontWeight: 600, textAlign: "left", color: "#000" };
const tdStyle = { padding: "18px 20px", fontSize: 15, color: "#000" }; // Set to Black

const toggleBtn = {
  padding: "6px 14px", backgroundColor: "#6c63ff", color: "#fff",
  borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13
};

const getBadgeStyle = (status) => {
  const styles = {
    assigned: { background: "#0d6efd33", color: "#0d6efd" },
    doing: { background: "#ffc10733", color: "#b88600" },
    submitted: { background: "#17a2b833", color: "#0d728f" },
    completed: { background: "#19875433", color: "#198754" }
  };
  return { ...styles[status], padding: "4px 10px", borderRadius: 5, fontSize: 12, fontWeight: 600 };
};