import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Inject CSS styles
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      /* RESET & BASE */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      /* LAYOUT */
      .dashboard-layout {
        display: flex;
        height: 100vh;
        background: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
      }

      /* SIDEBAR */
      .sidebar {
        width: 260px;
        background: #ffffff;
        border-right: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 100;
      }

      .sidebar-header {
        padding: 24px 20px;
        border-bottom: 1px solid #e2e8f0;
      }

      .logo {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .logo-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: 20px;
      }

      .logo-text {
        font-size: 20px;
        font-weight: 700;
        color: #1e293b;
      }

      .sidebar-nav {
        flex: 1;
        padding: 20px 12px;
        overflow-y: auto;
      }

      .nav-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        margin-bottom: 4px;
        background: transparent;
        border: none;
        border-radius: 8px;
        color: #64748b;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
      }

      .nav-item:hover {
        background: #f1f5f9;
        color: #2563eb;
      }

      .nav-item.active {
        background: #eff6ff;
        color: #2563eb;
      }

      .nav-icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .sidebar-footer {
        padding: 12px;
        border-top: 1px solid #e2e8f0;
      }

      .logout-btn {
        color: #ef4444;
      }

      .logout-btn:hover {
        background: #fef2f2;
        color: #dc2626;
      }

      /* MAIN CONTENT */
      .main-content {
        flex: 1;
        margin-left: 260px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      /* TOP BAR */
      .top-bar {
        background: white;
        padding: 24px 32px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .page-title h1 {
        font-size: 28px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 4px;
      }

      .page-subtitle {
        font-size: 14px;
        color: #64748b;
      }

      .top-bar-actions {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .icon-btn {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .icon-btn svg {
        width: 20px;
        height: 20px;
        color: #64748b;
      }

      .icon-btn:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .user-avatar:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      }

      /* CONTENT AREA */
      .content-area {
        flex: 1;
        padding: 32px;
        overflow-y: auto;
        background: #f8fafc;
      }

      /* STATS GRID */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
      }

      .stat-card {
        background: white;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: all 0.2s ease;
      }

      .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-icon svg {
        width: 24px;
        height: 24px;
        color: white;
      }

      .stat-icon.blue {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      }

      .stat-icon.green {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      }

      .stat-icon.orange {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      }

      .stat-icon.purple {
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      }

      .stat-info {
        flex: 1;
      }

      .stat-label {
        font-size: 14px;
        color: #64748b;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .stat-value {
        font-size: 28px;
        font-weight: 700;
        color: #1e293b;
      }

      /* CONTENT GRID */
      .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 24px;
      }

      /* CARDS */
      .card {
        background: white;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        overflow: hidden;
      }

      .card-header {
        padding: 20px 24px;
        border-bottom: 1px solid #e2e8f0;
      }

      .card-header h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
      }

      .card-body {
        padding: 24px;
      }

      /* PERMISSIONS */
      .permission-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .permission-item-modern {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .permission-item-modern.allowed {
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #bbf7d0;
      }

      .permission-item-modern.denied {
        background: #fef2f2;
        color: #991b1b;
        border: 1px solid #fecaca;
      }

      .permission-icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .permission-icon svg {
        width: 100%;
        height: 100%;
      }

      /* QUICK ACTIONS */
      .action-btn {
        width: 100%;
        padding: 14px 20px;
        border-radius: 10px;
        border: none;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.2s ease;
        margin-bottom: 12px;
      }

      .action-btn:last-child {
        margin-bottom: 0;
      }

      .action-btn svg {
        width: 20px;
        height: 20px;
      }

      .action-btn.primary {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
      }

      .action-btn.primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3);
      }

      .action-btn.secondary {
        background: #f8fafc;
        color: #475569;
        border: 1px solid #e2e8f0;
      }

      .action-btn.secondary:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
      }

      /* PROFILE SECTION */
      .profile-section {
        max-width: 600px;
        margin: 0 auto;
      }

      .profile-card {
        text-align: center;
      }

      .profile-header {
        padding: 40px 24px;
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        border-bottom: 1px solid #e2e8f0;
      }

      .profile-avatar-large {
        width: 100px;
        height: 100px;
        border-radius: 20px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 36px;
        margin: 0 auto 20px;
        box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
      }

      .profile-header h2 {
        font-size: 24px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 12px;
      }

      .role-badge-large {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .role-badge-large.user {
        background: #dbeafe;
        color: #1e40af;
      }

      .role-badge-large.admin {
        background: #fef3c7;
        color: #92400e;
      }

      .profile-details {
        padding: 24px;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0;
        border-bottom: 1px solid #e2e8f0;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .detail-label {
        font-size: 14px;
        font-weight: 600;
        color: #64748b;
      }

      .detail-value {
        font-size: 15px;
        font-weight: 500;
        color: #1e293b;
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 600;
      }

      .status-badge.active {
        background: #dcfce7;
        color: #166534;
      }

      .status-badge.inactive {
        background: #fee2e2;
        color: #991b1b;
      }

      /* RESPONSIVE */
      @media (max-width: 1024px) {
        .sidebar {
          width: 220px;
        }
        
        .main-content {
          margin-left: 220px;
        }
      }

      @media (max-width: 768px) {
        .sidebar {
          width: 70px;
        }
        
        .main-content {
          margin-left: 70px;
        }
        
        .logo-text,
        .nav-item span {
          display: none;
        }
        
        .nav-item {
          justify-content: center;
        }
        
        .stats-grid {
          grid-template-columns: 1fr;
        }
        
        .content-grid {
          grid-template-columns: 1fr;
        }
        
        .top-bar {
          padding: 16px 20px;
        }
        
        .content-area {
          padding: 20px;
        }
      }

      @media (max-width: 480px) {
        .sidebar {
          transform: translateX(-100%);
        }
        
        .main-content {
          margin-left: 0;
        }
        
        .page-title h1 {
          font-size: 22px;
        }
        
        .page-subtitle {
          font-size: 12px;
        }
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

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
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">D</div>
            <span className="logo-text">Dashboard</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>Overview</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('tasks');
              navigate('/my-tasks');
            }}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            <span>My Tasks</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m9.66-9H15m-6 0H1m18.66 6H15m-6 0H1" />
            </svg>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-bar">
          <div className="page-title">
            <h1>{activeTab === 'overview' ? 'Overview' : activeTab === 'tasks' ? 'My Tasks' : activeTab === 'profile' ? 'Profile' : 'Settings'}</h1>
            <p className="page-subtitle">Welcome back, {user?.name}!</p>
          </div>
          
          <div className="top-bar-actions">
            <button className="icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </button>
            
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="content-area">
          {activeTab === 'overview' && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">Active Tasks</p>
                    <h3 className="stat-value">12</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon green">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">Completed</p>
                    <h3 className="stat-value">48</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon orange">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">Pending</p>
                    <h3 className="stat-value">5</h3>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon purple">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">Total Projects</p>
                    <h3 className="stat-value">8</h3>
                  </div>
                </div>
              </div>

              <div className="content-grid">
                <div className="card permissions-card-modern">
                  <div className="card-header">
                    <h3>Your Permissions</h3>
                  </div>
                  <div className="card-body">
                    <div className="permission-list">
                      <div className="permission-item-modern allowed">
                        <div className="permission-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span>Access Dashboard</span>
                      </div>
                      
                      <div className="permission-item-modern allowed">
                        <div className="permission-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span>View Profile</span>
                      </div>
                      
                      <div className="permission-item-modern allowed">
                        <div className="permission-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <span>Change Password</span>
                      </div>
                      
                      <div className="permission-item-modern denied">
                        <div className="permission-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                          </svg>
                        </div>
                        <span>Manage Users</span>
                      </div>
                      
                      <div className="permission-item-modern denied">
                        <div className="permission-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                          </svg>
                        </div>
                        <span>Admin Settings</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3>Quick Actions</h3>
                  </div>
                  <div className="card-body">
                    <button 
                      className="action-btn primary"
                      onClick={() => navigate('/my-tasks')}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                      </svg>
                      View My Tasks
                    </button>
                    
                    <button className="action-btn secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Edit Profile
                    </button>
                    
                    <button className="action-btn secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="card profile-card">
                <div className="profile-header">
                  <div className="profile-avatar-large">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <h2>{user?.name}</h2>
                  <span className={`role-badge-large ${user?.role}`}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
                
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{user?.email}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Role</span>
                    <span className="detail-value">{user?.role}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Status</span>
                    <span className={`status-badge ${user?.is_active ? 'active' : 'inactive'}`}>
                      {user?.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;