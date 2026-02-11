import axios from 'axios';

// 1. Create the instance (as we discussed before)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: BASE_URL,
});

// 2. THE MISSING PIECE: The Interceptor
api.interceptors.request.use(
    (config) => {
        // Check if we have a token in storage
        const token = localStorage.getItem("token");

        // If token exists, attach it to the header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;