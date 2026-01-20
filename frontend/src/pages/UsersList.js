import React, { useEffect, useState } from "react";
import { getUsers } from "../services/userService"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      console.log("USERS RESPONSE:", res.data);

      // FIX HERE 🔥
      setUsers(res.data.users || []);

    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]); // safe fallback
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Logout now?")) {
      logout();
      navigate("/login");
    }
  };

  const primaryBlue = "#0d6efd";
  const lightGray = "#f8f9fa";
  const borderColor = "#dee2e6";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fff" }}>

      {/* Sidebar */}
      <div style={{
        width: 260,
        backgroundColor: "#1a1d23",
        color: "white",
        padding: "30px 20px",
        height: "100vh",
        position: "fixed"
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 40, color: primaryBlue }}>
          AdminPanel
        </h2>

        {/* Dashboard Link */}
        <div
          style={{ padding: "12px 15px", color: "#adb5bd", cursor: "pointer" }}
          onClick={() => navigate("/admin-dashboard")}
        >
          Dashboard
        </div>

        {/* Active Page Highlight */}
        <div
          style={{ padding: "12px 15px", backgroundColor: primaryBlue, borderRadius: 8, marginTop: 10 }}
        >
          Users List
        </div>

        {/* Logout */}
        <div
          onClick={handleLogout}
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

      {/* Main Content */}
      <div style={{ marginLeft: 260, padding: "40px 50px", flex: 1 }}>
        <h1 style={{ fontWeight: 700, marginBottom: 30 }}>All Users</h1>

        <div style={{
          background: "white",
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          overflow: "hidden"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: lightGray }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: 20, textAlign: "center", color: "#888" }}>
                    No users found.
                  </td>
                </tr>
              )}

              {users.map((u) => (
                <tr key={u.id} style={{ borderTop: `1px solid ${borderColor}` }}>
                  <td style={tdStyle}><strong>{u.name}</strong></td>
                  <td style={tdStyle}>{u.email}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "4px 10px",
                      backgroundColor: u.role === "admin" ? "#0d6efd33" : "#6c757d33",
                      borderRadius: 4,
                      fontWeight: 600
                    }}>
                      {u.role?.toUpperCase()}
                    </span>
                  </td>
                  <td style={tdStyle}>{u.is_active ? "Active" : "Inactive"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

// styles
const thStyle = { padding: "15px 20px", fontSize: 14, color: "#495057", fontWeight: 600 };
const tdStyle = { padding: "18px 20px", fontSize: 15, color: "#212529" };
