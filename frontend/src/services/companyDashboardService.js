import api from '../api/axios';

export const getCompany = (id) => api.get(`/companies/${id}`);
export const getAnalytics = (id) => api.get(`/companies/${id}/analytics`);
export const getScheduledPosts = (id) => api.get(`/companies/${id}/scheduled-posts`);
export const addPost = async (companyId, data) => {
  return api.post(`/companies/${companyId}/posts`, data);
};
export const updatePostStatus = (postId, status) =>
  api.put(`/posts/${postId}/status`, { status });

export default api;
