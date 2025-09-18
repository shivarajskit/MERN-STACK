import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/tasks',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Axios Interceptor → log errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  }
)

export default api;