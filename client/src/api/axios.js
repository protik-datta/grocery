import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URI || "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// axios.js
api.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    const url = error.config?.url || "";
    const isLogout = error.config?._isLogout;
    const isAuthCheck = url.includes("/auth/me");

    if (error.response?.status === 401 && !isLogout && !isAuthCheck) {
      console.error("Session expired. Please login again.");
    }

    if (error.response?.status === 403) {
      console.error("You do not have permission to perform this action");
    }

    return Promise.reject({
      status: error.response?.status,
      message,
    });
  },
);

export default api;
