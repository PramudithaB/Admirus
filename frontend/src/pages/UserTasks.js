import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  getMyTasks,
  userStartTask,
  userSubmitTask,
} from "../services/taskService";

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

  useEffect(() => {
    loadTasks();
  }, []);

  // USER ACTIONS
  const startTask = async (id) => {
    await userStartTask(id);
    loadTasks();
  };

  const submitTask = async (id) => {
    await userSubmitTask(id);
    loadTasks();
  };

  // UI COLOR VARIABLES
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
                  {/* ASSIGNED */}
                  {t.status === "assigned" && (
                    <span style={badgeAssigned}>Assigned</span>
                  )}

                  {/* DOING */}
                  {t.status === "doing" && (
                    <span style={badgeDoing}>Doing</span>
                  )}

                  {/* SUBMITTED */}
                  {t.status === "submitted" && (
                    <span style={badgeSubmitted}>
                      Waiting for Admin Approval
                    </span>
                  )}

                  {/* COMPLETED */}
                  {t.status === "completed" && (
                    <span style={badgeCompleted}>Completed</span>
                  )}
                </td>

                <td style={tdStyle}>
                  {/* Start Task Button */}
                  {t.status === "assigned" && (
                    <button
                      onClick={() => startTask(t.id)}
                      style={btnStart}
                    >
                      Start Task
                    </button>
                  )}

                  {/* Submit for Approval */}
                  {t.status === "doing" && (
                    <button
                      onClick={() => submitTask(t.id)}
                      style={btnSubmit}
                    >
                      Send for Approval
                    </button>
                  )}

                  {/* No action for submitted/completed */}
                  {(t.status === "submitted" || t.status === "completed") && (
                    <span style={{ color: "#888", fontWeight: 600 }}>
                      —
                    </span>
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

/* STYLES */
const thStyle = {
  padding: "15px 20px",
  fontWeight: 600,
  color: "#495057",
};

const tdStyle = {
  padding: "18px 20px",
  fontSize: 15,
};

const badgeAssigned = {
  padding: "4px 8px",
  background: "#0d6efd33",
  color: "#0d6efd",
  borderRadius: 5,
  fontWeight: 600,
};

const badgeDoing = {
  padding: "4px 8px",
  background: "#ffc10733",
  color: "#b88600",
  borderRadius: 5,
  fontWeight: 600,
};

const badgeSubmitted = {
  padding: "4px 8px",
  background: "#17a2b833",
  color: "#0b7285",
  borderRadius: 5,
  fontWeight: 600,
};

const badgeCompleted = {
  padding: "4px 8px",
  background: "#19875433",
  color: "#198754",
  borderRadius: 5,
  fontWeight: 600,
};

const btnStart = {
  padding: "6px 12px",
  backgroundColor: "#0d6efd",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600,
};

const btnSubmit = {
  padding: "6px 12px",
  backgroundColor: "#6c63ff",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontWeight: 600,
};
