import axios from "axios";

const instance = axios.create({
  baseURL: "https://admirus.com.lk/api",
  withCredentials: true
});

// Attach token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
