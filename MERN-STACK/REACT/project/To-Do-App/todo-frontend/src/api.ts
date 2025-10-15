import axios from 'axios';
import { store } from './store/store';
import { logoutUser, setToken } from './store/slices/authSlice';

const api = axios.create({
    baseURL: 'https://mern-stack-todo-app-6ud6.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Allow cookies to be sent with requests
});

// 🔑 A separate axios instance (no interceptors) for refresh
const refreshApi = axios.create({
  baseURL: "https://mern-stack-todo-app-6ud6.onrender.com/",
  withCredentials: true,
});

// Attach token from Redux store
api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle expired access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 🚫 Use refreshApi so it doesn’t trigger interceptor
        const response = await refreshApi.post("/api/auth/refresh-token", {});
        const newAccessToken = response.data.accessToken;

        // Update Redux store with new token
        store.dispatch(setToken(newAccessToken));

        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error)
  }
);

export default api;
