import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
=======
  baseURL: 'https://admirus.com.lk/backend/public/api',
>>>>>>> 6fdaa8f58205f85b584cb6a94c8eb19b61d1dd55
  withCredentials: true,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
