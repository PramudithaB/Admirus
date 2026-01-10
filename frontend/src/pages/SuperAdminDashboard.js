import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const SuperAdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card super-admin-card">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Super Admin Dashboard</h1>
            <p className="dashboard-subtitle">Full System Access</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar super-admin-avatar">SA</div>
          <div className="user-details">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <span className="role-badge super-admin-badge">{user?.role.replace('_', ' ').toUpperCase()}</span>
          </div>
        </div>

        <div className="dashboard-content">
          <h3>Super Admin Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>👥 User Management</h4>
              <p>Manage all system users and roles</p>
            </div>
            <div className="feature-card">
              <h4>⚙️ System Settings</h4>
              <p>Configure system-wide settings</p>
            </div>
            <div className="feature-card">
              <h4>📊 Analytics</h4>
              <p>View comprehensive system analytics</p>
            </div>
            <div className="feature-card">
              <h4>🔒 Security</h4>
              <p>Manage security and permissions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
