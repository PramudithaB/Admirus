import axios from 'axios';

const api = axios.create({
  baseURL: 'https://admirus.com.lk/backend/public/api',
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCompanies = () => api.get('/companies');
export const createCompany = (data) => api.post('/companies', data);
export const updateCompany = (id, data) => api.put(`/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/companies/${id}`);
export const getCompany = (id) => api.get(`/companies/${id}`);
export const getAnalytics = (id) => api.get(`/companies/${id}/analytics`);
export const getScheduledPosts = (id) => api.get(`/companies/${id}/scheduled-posts`);
export const addPost = (id, data) => api.post(`/companies/${id}/posts`, data);
export const updatePostStatus = (id, data) => api.put(`/posts/${id}/status`, data);

export default api;
