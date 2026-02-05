import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // --- MODERN STYLES --- (Your provided objects)
  const containerStyle = {
    display: "flex", justifyContent: "center", alignItems: "center",
    minHeight: "100vh", backgroundColor: "#f0f2f5",
    backgroundImage: "radial-gradient(at 0% 0%, hsla(210,100%,93%,1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(210,100%,93%,1) 0, transparent 50%)",
    fontFamily: "'Inter', -apple-system, sans-serif", position: "relative", overflow: "hidden"
  };

  const blobStyle = {
    position: "absolute", width: "500px", height: "500px",
    background: "linear-gradient(135deg, #0d6efd1a 0%, #0d6efd05 100%)",
    borderRadius: "50%", top: "-100px", right: "-100px", zIndex: 0
  };

  const cardStyle = {
    width: "100%", maxWidth: "440px", backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)", padding: "50px 40px", borderRadius: "24px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.7)", zIndex: 1
  };

  const logoBadge = {
    width: "48px", height: "48px", backgroundColor: "#0d6efd", color: "white",
    borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "24px", fontWeight: "800", margin: "0 auto 16px auto",
    boxShadow: "0 10px 15px -3px rgba(13, 110, 253, 0.3)"
  };

  const titleStyle = { fontSize: "28px", fontWeight: "800", color: "#1e293b", margin: "0 0 8px 0", letterSpacing: "-0.025em", textAlign: 'center' };
  const subtitleStyle = { color: "#64748b", fontSize: "15px", lineHeight: "1.5", textAlign: 'center', marginBottom: '32px' };
  const groupStyle = { marginBottom: "20px" };
  const labelStyle = { display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "8px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.025em" };
  
  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid #e2e8f0",
    fontSize: "16px", outline: "none", boxSizing: "border-box", backgroundColor: "#fff"
  };

  const btnStyle = {
    width: "100%", padding: "14px", backgroundColor: "#0d6efd", color: "white",
    border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer", display: "flex", justifyContent: "center",
    alignItems: "center", boxShadow: "0 4px 6px -1px rgba(13, 110, 253, 0.2)", marginTop: "10px"
  };

  const errorBanner = {
    backgroundColor: "#fef2f2", color: "#b91c1c", padding: "12px 16px",
    borderRadius: "12px", border: "1px solid #fee2e2", marginBottom: "24px",
    fontSize: "14px", fontWeight: "500", textAlign: "center"
  };

  const spinnerStyle = {
    width: "20px", height: "20px", border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid white", borderRadius: "50%", animation: "spin 1s linear infinite",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await register(name, email, password, passwordConfirmation);
    if (result.success) navigate('/dashboard');
    else setError(result.message);
    setLoading(false);
  };

  return (
    <div style={containerStyle}>
      {/* Animation Injection */}
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      
      <div style={blobStyle}></div>
      
      <div style={cardStyle}>
<div style={logoBadge}>
  <img 
    src="/admirus.jpeg" 
    alt="Admirus Logo" 
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "0%"
    }}
  />
</div>        <h2 style={titleStyle}>Create Account</h2>
        <p style={subtitleStyle}>Join us to start managing your projects.</p>

        <form onSubmit={handleSubmit}>
          {error && <div style={errorBanner}>{error}</div>}
          
          <div style={groupStyle}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              style={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@company.com"
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
              placeholder="••••••••"
            />
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              style={inputStyle}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              minLength="8"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? <div style={spinnerStyle}></div> : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: "24px", color: '#64748b', fontSize: "15px" }}>
          Already have an account? <Link to="/login" style={{ color: "#0d6efd", textDecoration: 'none', fontWeight: "600" }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;