import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card student-card">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Student Dashboard</h1>
            <p className="dashboard-subtitle">Learning Portal</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar student-avatar">S</div>
          <div className="user-details">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <span className="role-badge student-badge">{user?.role.toUpperCase()}</span>
          </div>
        </div>

        <div className="dashboard-content">
          <h3>Student Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>📚 My Courses</h4>
              <p>View enrolled courses</p>
            </div>
            <div className="feature-card">
              <h4>📝 Assignments</h4>
              <p>View and submit assignments</p>
            </div>
            <div className="feature-card">
              <h4>📊 Grades</h4>
              <p>Check your grades and progress</p>
            </div>
            <div className="feature-card">
              <h4>📅 Schedule</h4>
              <p>View class schedule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
