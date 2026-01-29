import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyTasks, completeTask } from "../services/taskService";

export default function UserTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await getMyTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Task load error:", error);
    }
  };

  // ✅ useEffect always runs — NOT inside any IF
  useEffect(() => {
    loadTasks();
  }, []);

  const handleComplete = async (id) => {
    await completeTask(id);
    loadTasks();
  };

  const lightGray = "#f8f9fa";
  const borderColor = "#dee2e6";

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontWeight: 700 }}>My Tasks</h1>
      <p style={{ marginBottom: 30 }}>Welcome, {user?.name}</p>

      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
        }}
      >
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
            {tasks.map((t) => (
              <tr key={t.id} style={{ borderTop: `1px solid ${borderColor}` }}>
                <td style={tdStyle}>{t.company?.name}</td>
                <td style={tdStyle}>{t.content_type}</td>
                <td style={tdStyle}>{t.remark}</td>
                <td style={tdStyle}>
                  {t.status === "pending" ? (
                    <span style={pendingBadge}>Pending</span>
                  ) : (
                    <span style={doneBadge}>Completed</span>
                  )}
                </td>
                <td style={tdStyle}>
                  {t.status === "pending" && (
                    <button
                      onClick={() => handleComplete(t.id)}
                      style={completeBtn}
                    >
                      Mark Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tasks.length === 0 && (
          <p style={{ textAlign: "center", padding: 20, color: "#999" }}>
            No tasks assigned yet.
          </p>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "15px 20px",
  fontWeight: 600,
  color: "#495057",
};

const tdStyle = {
  padding: "18px 20px",
  fontSize: 15,
  color: "#212529",
};

const pendingBadge = {
  padding: "4px 8px",
  background: "#ffc10733",
  color: "#b88600",
  borderRadius: 5,
  fontWeight: 600,
};

const doneBadge = {
  padding: "4px 8px",
  background: "#19875433",
  color: "#198754",
  borderRadius: 5,
  fontWeight: 600,
};

const completeBtn = {
  padding: "6px 12px",
  backgroundColor: "#198754",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
};
