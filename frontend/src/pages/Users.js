import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  
  const { user: currentUser, hasRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter(u => u.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.put(`/users/${editingUser.id}`, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        is_active: editingUser.is_active,
      });
      
      setUsers(users.map(u => u.id === editingUser.id ? response.data.user : u));
      setEditingUser(null);
      alert('User updated successfully');
    } catch (error) {
      alert('Failed to update user');
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>User Management</h1>
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          Back to Dashboard
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role?.toUpperCase()}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  {hasRole('superadmin') && user.id !== currentUser?.id && (
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit User</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">SuperAdmin</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={editingUser.is_active}
                    onChange={(e) => setEditingUser({...editingUser, is_active: e.target.checked})}
                  />
                  Active
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
