import api from '../api/axios';

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
