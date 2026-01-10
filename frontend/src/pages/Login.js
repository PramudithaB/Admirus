import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // Redirect based on role
      const roleDashboards = {
        super_admin: '/super-admin/dashboard',
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        student: '/student/dashboard',
      };
      navigate(roleDashboards[result.user.role] || '/');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const quickLogin = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">LMS Login</h1>
        <p className="login-subtitle">Learning Management System</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="demo-accounts">
          <p className="demo-title">Quick Login (Demo Accounts):</p>
          <div className="demo-buttons">
            <button 
              onClick={() => quickLogin('superadmin@lms.com', 'password')}
              className="demo-button super-admin"
              disabled={loading}
            >
              Super Admin
            </button>
            <button 
              onClick={() => quickLogin('admin@lms.com', 'password')}
              className="demo-button admin"
              disabled={loading}
            >
              Admin
            </button>
            <button 
              onClick={() => quickLogin('teacher@lms.com', 'password')}
              className="demo-button teacher"
              disabled={loading}
            >
              Teacher
            </button>
            <button 
              onClick={() => quickLogin('student@lms.com', 'password')}
              className="demo-button student"
              disabled={loading}
            >
              Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
