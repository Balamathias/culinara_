import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const onAccessTokenRefreshed = (newToken: string) => {
  refreshSubscribers.map((callback) => callback(newToken));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and the user has a refresh token, try refreshing the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loop

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // No refresh token, redirect to login or show error
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });

          const newToken = response.data.access;
          localStorage.setItem('token', newToken);

          isRefreshing = false;
          onAccessTokenRefreshed(newToken);
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          isRefreshing = false;
          return Promise.reject(err);
        }
      }

      // Wait until the token refresh is completed
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          resolve(client(originalRequest));
        });
      });

      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

export default client;
