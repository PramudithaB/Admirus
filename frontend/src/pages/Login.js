import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Primary Theme Colors
  const primaryBlue = "#0d6efd";
  const textColor = "#1a1d23";
  const borderColor = "#dee2e6";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      const role = result.user.role;
      if (role === 'admin' || role === 'superadmin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: primaryBlue, margin: 0 }}>AdminPanel</h2>
          <p style={{ color: '#6c757d', marginTop: 10 }}>Sign in to manage your assets</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={errorBanner}>
              {error}
            </div>
          )}

          <div style={groupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@company.com"
              style={inputStyle}
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              ...btnStyle, 
              backgroundColor: loading ? '#b0d4ff' : primaryBlue,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#6c757d', fontSize: 14 }}>
          Don't have an account? <Link to="/register" style={{ color: primaryBlue, textDecoration: 'none', fontWeight: 600 }}>Register here</Link>
        </p>

        {/* Demo Credentials Section */}
        <div style={demoBoxStyle}>
          <p style={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: '#adb5bd', marginBottom: 8 }}>Demo Credentials</p>
          <div style={{ fontSize: 13, color: '#495057' }}>
            <div><strong>Admin:</strong> admin@example.com <span style={{color: '#ccc'}}>|</span> password123</div>
            <div style={{marginTop: 4}}><strong>User:</strong> user@example.com <span style={{color: '#ccc'}}>|</span> password123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles object for clean organization
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f8f9fa", // Slight off-white for depth
  fontFamily: "'Segoe UI', Roboto, sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  border: "1px solid #dee2e6",
};

const groupStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "8px",
  color: "#444",
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #dee2e6",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  marginTop: "10px",
  transition: "background 0.3s",
};

const errorBanner = {
  backgroundColor: "#fff5f5",
  color: "#dc3545",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ffc9c9",
  marginBottom: "20px",
  fontSize: "14px",
  textAlign: "center"
};

const demoBoxStyle = {
  marginTop: "30px",
  padding: "15px",
  backgroundColor: "#f1f3f5",
  borderRadius: "8px",
  border: "1px dashed #dee2e6"
};

export default Login;