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

export const getUsers = () => api.get('/users');
export const getCompanies = () => api.get('/companies');
export const createTask = (data) => api.post('/tasks', data);
export const getAdminTasks = () => api.get('/tasks/admin');
export const getMyTasks = () => api.get('/tasks/my');
export const completeTask = (id) => api.put(`/tasks/${id}/complete`);
export const updateTaskStatus = (id, status) => api.put(`/tasks/${id}/status`, { status });
export const userStartTask = (id) => api.put(`/tasks/${id}/start`);
export const userSubmitTask = (id) => api.put(`/tasks/${id}/submit`);
export const adminCompleteTask = (id) => api.put(`/tasks/${id}/complete`);

export default api;
