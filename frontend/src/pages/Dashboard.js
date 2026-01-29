import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  // Prevent admins from viewing user dashboard
  if (hasRole(['admin', 'superadmin'])) {
    navigate('/admin-dashboard');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="dashboard-content">

        {/* USER INFO */}
        <div className="user-info-card">
          <h2>Welcome, {user?.name}!</h2>
          <div className="user-details">
            <p><strong>Email:</strong> {user?.email}</p>
            <p>
              <strong>Role:</strong>
              <span className={`role-badge ${user?.role}`}>
                {user?.role?.toUpperCase()}
              </span>
            </p>
            <p><strong>Status:</strong> {user?.is_active ? 'Active' : 'Inactive'}</p>
          </div>
        </div>

        {/* PERMISSIONS */}
        <div className="permissions-card">
          <h3>Your Permissions</h3>
          <ul className="permissions-list">
            <li className="permission-item active">✓ Access Dashboard</li>
            <li className="permission-item active">✓ View Profile</li>
            <li className="permission-item active">✓ Change Password</li>
            <li className="permission-item inactive">✗ Manage Users</li>
            <li className="permission-item inactive">✗ Admin Settings</li>
          </ul>
        </div>

        {/* TASK BUTTON */}
        <div className="user-info-card">
          <h3>Assigned Tasks</h3>
          <button
            onClick={() => navigate("/my-tasks")}
            className="btn-primary"
            style={{ marginTop: 15 }}
          >
            View My Tasks
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
