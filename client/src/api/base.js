import axios from "axios";

const baseApi = axios.create({
    baseURL: "https://depi-task-management-api-simplified.vercel.app",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include the token in each request
baseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt_token"); // or any method you use to store tokens
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default baseApi;
