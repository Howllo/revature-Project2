import axios from "axios";
import Cookies from "js-cookie";

export const projectApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL  || 'http://localhost:8080/api/v1',
    withCredentials: true,
});

projectApi.interceptors.request.use(
    (config) => {
        const token = Cookies.get('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);