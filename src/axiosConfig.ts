// axiosConfig.ts
import axios from 'axios';

// const api = axios.create({ baseURL: '/api' });
const api = axios.create({ 
  // Point this to your backend URL (from .env)
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL: import.meta.env.VITE_API_URL,
  // CRITICAL: This allows the browser to automatically send the JWT cookie
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;