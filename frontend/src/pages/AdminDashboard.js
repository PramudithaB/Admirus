import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: '30px',
          backgroundColor: '#f5f7fb',
          minHeight: '100vh',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '5px',
          }}
        >
          Admin Panel
        </h1>

        <p style={{ color: '#666', marginBottom: '30px' }}>
          Manage system operations
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Create Pages */}
          <div style={cardStyle}>
            <h3>📄 Create Pages</h3>
            <p style={textStyle}>Create and manage system pages</p>
            <button style={buttonStyle}>Go</button>
          </div>

          {/* Apply Tasks */}
          <div style={cardStyle}>
            <h3>✅ Apply Tasks</h3>
            <p style={textStyle}>Assign and track tasks</p>
            <button style={buttonStyle}>Go</button>
          </div>

          {/* Feedbacks */}
          <div style={cardStyle}>
            <h3>💬 Feedbacks</h3>
            <p style={textStyle}>View user feedback and reviews</p>
            <button style={buttonStyle}>Go</button>
          </div>

          {/* Payments */}
          <div style={cardStyle}>
            <h3>💳 All Payments</h3>
            <p style={textStyle}>Manage and view payments</p>
            <button style={buttonStyle}>Go</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable Inline Styles
const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
};

const textStyle = {
  color: '#555',
  fontSize: '14px',
  marginBottom: '15px',
};

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  backgroundColor: '#4f46e5',
  color: '#ffffff',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default AdminDashboard;
