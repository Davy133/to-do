import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL || 'https://to-do-5ddm.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;