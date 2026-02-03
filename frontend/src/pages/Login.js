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
      setError(result.message || "Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      {/* Decorative Background Element */}
      <div style={blobStyle}></div>

      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: 35 }}>
          <div style={logoBadge}>A</div>
          <h2 style={titleStyle}>Welcome Back</h2>
          <p style={subtitleStyle}>Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={errorBanner}>
              <span style={{ marginRight: 8 }}>⚠️</span> {error}
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
              onFocus={(e) => e.target.style.borderColor = "#0d6efd"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          <div style={groupStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label style={labelStyle}>Password</label>
              <a href="#" style={forgotPass}>Forgot?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = "#0d6efd"}
              onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              ...btnStyle, 
              opacity: loading ? 0.7 : 1,
              transform: loading ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            {loading ? (
               <span style={spinnerStyle}></span>
            ) : 'Sign In'}
          </button>
        </form>

        <p style={footerTextStyle}>
          New here? <Link to="/register" style={linkStyle}>Create an account</Link>
        </p>

       
      </div>
    </div>
  );
};

/* --- MODERN STYLES --- */

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f0f2f5",
  backgroundImage: "radial-gradient(at 0% 0%, hsla(210,100%,93%,1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(210,100%,93%,1) 0, transparent 50%)",
  fontFamily: "'Inter', -apple-system, sans-serif",
  position: "relative",
  overflow: "hidden"
};

const blobStyle = {
  position: "absolute",
  width: "500px",
  height: "500px",
  background: "linear-gradient(135deg, #0d6efd1a 0%, #0d6efd05 100%)",
  borderRadius: "50%",
  top: "-100px",
  right: "-100px",
  zIndex: 0
};

const cardStyle = {
  width: "100%",
  maxWidth: "440px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  padding: "50px 40px",
  borderRadius: "24px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.7)",
  zIndex: 1
};

const logoBadge = {
  width: "48px",
  height: "48px",
  backgroundColor: "#0d6efd",
  color: "white",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: "800",
  margin: "0 auto 16px auto",
  boxShadow: "0 10px 15px -3px rgba(13, 110, 253, 0.3)"
};

const titleStyle = { 
  fontSize: "28px", 
  fontWeight: "800", 
  color: "#1e293b", 
  margin: "0 0 8px 0",
  letterSpacing: "-0.025em"
};

const subtitleStyle = { 
  color: "#64748b", 
  fontSize: "15px",
  lineHeight: "1.5"
};

const groupStyle = { marginBottom: "24px" };

const labelStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: "600",
  marginBottom: "8px",
  color: "#475569",
  textTransform: "uppercase",
  letterSpacing: "0.025em"
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#fff",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
};

const forgotPass = {
  fontSize: "13px",
  color: "#0d6efd",
  textDecoration: "none",
  fontWeight: "500"
};

const btnStyle = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#0d6efd",
  color: "white",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 4px 6px -1px rgba(13, 110, 253, 0.2)"
};

const errorBanner = {
  backgroundColor: "#fef2f2",
  color: "#b91c1c",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #fee2e2",
  marginBottom: "24px",
  fontSize: "14px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center"
};

const footerTextStyle = { 
  textAlign: 'center', 
  marginTop: "24px", 
  color: '#64748b', 
  fontSize: "15px" 
};

const linkStyle = { 
  color: "#0d6efd", 
  textDecoration: 'none', 
  fontWeight: "600" 
};

const demoBoxStyle = {
  marginTop: "32px",
  padding: "20px",
  backgroundColor: "#f8fafc",
  borderRadius: "16px",
  border: "1px solid #f1f5f9"
};

const demoHeader = { 
  fontWeight: "700", 
  fontSize: "12px", 
  textTransform: 'uppercase', 
  color: '#94a3b8', 
  marginBottom: "12px",
  letterSpacing: "0.05em"
};

const demoGrid = { fontSize: "13px", color: "#334155", lineHeight: "1.6" };

const roleBadge = {
  padding: "2px 6px",
  backgroundColor: "#e2e8f0",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: "700",
  marginRight: "8px",
  color: "#475569"
};

const spinnerStyle = {
  width: "20px",
  height: "20px",
  border: "3px solid rgba(255,255,255,0.3)",
  borderTop: "3px solid white",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

// Add this to your global CSS or a style tag
const injectAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Login;