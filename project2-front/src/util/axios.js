﻿import axios from "axios";
import Cookies from "js-cookie";

export const projectApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL  || 'https://api.devature.dev/api/v1',
    withCredentials: false,
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