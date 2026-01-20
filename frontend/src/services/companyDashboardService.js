import api from './api';

export const getCompany = (id) => api.get(`/companies/${id}`);
export const getAnalytics = (id) => api.get(`/companies/${id}/analytics`);
export const getScheduledPosts = (id) => api.get(`/companies/${id}/scheduled-posts`);
export const addPost = async (companyId, data) => {
  return api.post(`/companies/${companyId}/posts`, data);
};
