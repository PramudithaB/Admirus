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

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getCompany = (id) => api.get(`/companies/${id}`);
export const getAnalytics = (id) => api.get(`/companies/${id}/analytics`);
export const getScheduledPosts = (id) => api.get(`/companies/${id}/scheduled-posts`);
export const addPost = async (companyId, data) => {
  return api.post(`/companies/${companyId}/posts`, data);
};
export const updatePostStatus = (postId, status) =>
  api.put(`/posts/${postId}/status`, { status });

export default api;
