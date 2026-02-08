import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Attempting login:', { email });
      const response = await api.post('/login', { email, password });
      const { user, access_token } = response.data;
      
      console.log('Login successful:', { user });
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error.response || error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.errors 
        || 'Login failed. Please check your credentials.';
      
      return {
        success: false,
        message: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
      };
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      console.log('Attempting registration:', { name, email });
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation,
      });
      const { user, access_token } = response.data;
      
      console.log('Registration successful:', { user });
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error.response || error);
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.errors 
        || 'Registration failed. Please try again.';
      
      // If validation errors, format them
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorList = Object.values(errors).flat().join(', ');
        return {
          success: false,
          message: errorList,
        };
      }
      
      return {
        success: false,
        message: typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage),
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    return user.role === roles;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        hasRole,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
