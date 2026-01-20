import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Unauthorized from './pages/Unauthorized';
import './styles/index.css';
import AdminDashboard from './pages/AdminDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import UsersList from './pages/UsersList';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/users-list"
  element={
    <ProtectedRoute roles={['admin', 'superadmin']}>
      <UsersList />
    </ProtectedRoute>
  }
/>

          <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute roles={['admin', 'superadmin']}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/company/:id/dashboard"
  element={
    <ProtectedRoute roles={['admin', 'superadmin']}>
      <CompanyDashboard />
    </ProtectedRoute>
  }
/>

          
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={['admin', 'superadmin']}>
                <Users />
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
