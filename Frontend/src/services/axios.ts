import axios from 'axios';

import { API_BASE_URL } from '../types/constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,

  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});

/* Request Interceptor */
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

/* Response Interceptor */
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (import.meta.env.DEV && error.response?.status === 401) {
      console.error('Unauthorized access');
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
