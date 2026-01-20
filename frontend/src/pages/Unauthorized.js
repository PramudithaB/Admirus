import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this resource.</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
