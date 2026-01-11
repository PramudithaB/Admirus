import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import Sidebar from '../components/Sidebar';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-container">
          <div className="dashboard-card student-card">
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">User Dashboard</h1>
                <p className="dashboard-subtitle">Learning Portal</p>
              </div>
            </div>

            <div className="user-info">
              <div className="user-avatar student-avatar">S</div>
              <div className="user-details">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
                <span className="role-badge student-badge">{user?.role?.toUpperCase()}</span>
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
      </main>
    </div>
  );
};

export default StudentDashboard;
