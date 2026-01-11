import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const navItems = [
  { label: 'All Pages', path: '/allpages', icon: '🌐' }, // NEW: link to All Pages
  { label: 'My Courses', path: '/courses', icon: '📚' },
  { label: 'Assignments', path: '/assignments', icon: '📝' },
  { label: 'Grades', path: '/grades', icon: '📊' },
  { label: 'Schedule', path: '/schedule', icon: '📅' },
  { label: 'Profile', path: '/profile', icon: '👤' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar sidebar-modern">
      <div className="sidebar-header">
        <div className="avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
        <div className="header-text">
          <h3>{user?.name || 'User'}</h3>
          <p className="email">{user?.email}</p>
          <p className="user-role">{user?.role?.toUpperCase()}</p>
        </div>
      </div>

      <nav>
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
