// src/utils/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api', // Fallback to localhost if environment variable is missing
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for token injection
api.interceptors.request.use(
  (config) => {
    // Optionally, include a token in the headers if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle common errors globally
    if (error.response) {
      console.error(
        `API Error: ${error.response.status} - ${error.response.data.message || error.message}`
      );
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Axios Configuration Error:', error.message);
    }

    // Optional: Handle token expiration or specific status codes
    if (error.response?.status === 401) {
      // Log the user out or refresh the token
      console.warn('Unauthorized! Please log in again.');
    }

    return Promise.reject(error);
  }
);

export default api;

