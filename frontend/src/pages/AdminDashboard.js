import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card admin-card">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">Administrative Access</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar admin-avatar">A</div>
          <div className="user-details">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <span className="role-badge admin-badge">{user?.role.toUpperCase()}</span>
          </div>
        </div>

        <div className="dashboard-content">
          <h3>Admin Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>👥 Manage Users</h4>
              <p>Add and manage teachers and students</p>
            </div>
            <div className="feature-card">
              <h4>📚 Course Management</h4>
              <p>Create and organize courses</p>
            </div>
            <div className="feature-card">
              <h4>📊 Reports</h4>
              <p>View system reports and statistics</p>
            </div>
            <div className="feature-card">
              <h4>📝 Content Approval</h4>
              <p>Review and approve content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
