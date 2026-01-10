import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card teacher-card">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Teacher Dashboard</h1>
            <p className="dashboard-subtitle">Teaching Portal</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

        <div className="user-info">
          <div className="user-avatar teacher-avatar">T</div>
          <div className="user-details">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <span className="role-badge teacher-badge">{user?.role.toUpperCase()}</span>
          </div>
        </div>

        <div className="dashboard-content">
          <h3>Teacher Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>📚 My Courses</h4>
              <p>View and manage your courses</p>
            </div>
            <div className="feature-card">
              <h4>👨‍🎓 Students</h4>
              <p>View enrolled students</p>
            </div>
            <div className="feature-card">
              <h4>📝 Assignments</h4>
              <p>Create and grade assignments</p>
            </div>
            <div className="feature-card">
              <h4>📊 Progress Tracking</h4>
              <p>Monitor student progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
