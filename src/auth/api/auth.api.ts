import axios from 'axios'

const BASE_URL = import.meta.env.VITE_AUTH_URL;

export const authApi = axios.create({
    baseURL: `${BASE_URL}/api`,
});

//interceptor
authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
