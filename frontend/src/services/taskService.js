import axios from "./axios";

export const getUsers = () => axios.get("/users");
export const getCompanies = () => axios.get("/companies");

export const createTask = (data) => axios.post("/tasks", data);

export const getAdminTasks = () => axios.get("/tasks/admin");

export const getMyTasks = () => axios.get("/tasks/my");

export const completeTask = (id) => axios.put(`/tasks/${id}/complete`);

// ⭐ ADD THIS NEW FUNCTION ⭐
export const updateTaskStatus = (id, status) =>
  axios.put(`/tasks/${id}/status`, { status });
