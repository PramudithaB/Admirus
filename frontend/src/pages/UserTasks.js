import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import {
  getMyTasks,
  userStartTask,
  userSubmitTask,
} from "../services/taskService";

const UserTasks = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [activeTab] = useState('tasks');

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

  const startTask = async (id) => {
    await userStartTask(id);
    loadTasks();
  };

  const submitTask = async (id) => {
    await userSubmitTask(id);
    loadTasks();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  /* INLINE STYLE OBJECTS */
  const styles = {
    layout: { display: 'flex', height: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' },
    sidebar: { width: '260px', background: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' },
    sidebarHeader: { padding: '24px 20px', borderBottom: '1px solid #e2e8f0' },
    logo: { display: 'flex', alignItems: 'center', gap: '12px' },
    logoIcon: { width: '40px', height: '40px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' },
    navItem: (isActive) => ({ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: isActive ? '#eff6ff' : 'transparent', border: 'none', borderRadius: '8px', color: isActive ? '#2563eb' : '#64748b', fontSize: '15px', fontWeight: '500', cursor: 'pointer', textAlign: 'left', marginBottom: '4px' }),
    mainContent: { flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' },
    topBar: { background: 'white', padding: '24px 32px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    contentArea: { padding: '32px', overflowY: 'auto' },
    tableCard: { background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { background: '#f8fafc', padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' },
    td: { padding: '16px 24px', fontSize: '15px', color: '#1e293b', borderBottom: '1px solid #e2e8f0' },
    badge: (status) => {
      const colors = {
        assigned: { bg: '#eff6ff', text: '#2563eb' },
        doing: { bg: '#fffbeb', text: '#d97706' },
        submitted: { bg: '#f0fdfa', text: '#0d9488' },
        completed: { bg: '#f0fdf4', text: '#166534' }
      };
      const color = colors[status] || colors.assigned;
      return { padding: '4px 12px', borderRadius: '9999px', fontSize: '13px', fontWeight: '600', background: color.bg, color: color.text };
    },
    btnPrimary: { padding: '8px 16px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }
  };

  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>D</div>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>Dashboard</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: '20px 12px' }}>
          <button style={styles.navItem(false)} onClick={() => navigate('/dashboard')}>
            <span>Overview</span>
          </button>
          <button style={styles.navItem(true)}>
            <span>My Tasks</span>
          </button>
        </div>
        <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0' }}>
          <button onClick={handleLogout} style={{ ...styles.navItem(false), color: '#ef4444' }}>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.mainContent}>
        <header style={styles.topBar}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>My Tasks</h1>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Welcome back, {user?.name}</p>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </header>

        <div style={styles.contentArea}>
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Client</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Remark</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id}>
                    <td style={{ ...styles.td, fontWeight: '600' }}>{t.company?.name}</td>
                    <td style={styles.td}>{t.content_type}</td>
                    <td style={{ ...styles.td, color: '#64748b' }}>{t.remark || '—'}</td>
                    <td style={styles.td}>
                      <span style={styles.badge(t.status)}>
                        {t.status === 'submitted' ? 'Waiting Approval' : t.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {t.status === "assigned" && (
                        <button onClick={() => startTask(t.id)} style={styles.btnPrimary}>
                          Start Task
                        </button>
                      )}
                      {t.status === "doing" && (
                        <button onClick={() => submitTask(t.id)} style={{ ...styles.btnPrimary, background: '#6366f1' }}>
                          Submit Work
                        </button>
                      )}
                      {(t.status === "submitted" || t.status === "completed") && (
                        <span style={{ color: "#cbd5e1", fontSize: '13px' }}>Locked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {tasks.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                No tasks assigned to you.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserTasks;