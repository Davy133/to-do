import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'https://to-do-5ddm.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;