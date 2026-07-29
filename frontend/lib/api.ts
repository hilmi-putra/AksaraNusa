import axios from 'axios';
import Cookies from 'js-cookie';

// Constants
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const TOKEN_COOKIE = 'aksaranusa_token';
export const USER_COOKIE = 'aksaranusa_user';

// Configure Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  // If backend uses CSRF cookie (Sanctum stateful), set withCredentials: true.
  // Since we use Bearer tokens, we don't strictly need withCredentials for cross-origin,
  // but it's fine to leave it out unless we face CORS issues.
});

// Request interceptor to attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_COOKIE);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors
api.interceptors.response.use(
  (response) => {
    return response.data; // Return the data directly to simplify usage
  },
  (error) => {
    // Check if the backend sent a standardized error response
    const customError = error.response?.data?.message || 'Terjadi kesalahan pada server.';
    
    // Auto-logout on 401 Unauthorized
    if (error.response?.status === 401) {
      Cookies.remove(TOKEN_COOKIE);
      Cookies.remove(USER_COOKIE);
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject({
      ...error,
      customMessage: customError,
      validationErrors: error.response?.data?.errors || null,
    });
  }
);

export default api;
