import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

const Instance = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


const formInstance = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

export {Instance , formInstance};