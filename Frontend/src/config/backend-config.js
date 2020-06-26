import axios from 'axios';

export const SpringBackend = axios.create({
    baseURL: `http://192.168.99.100:8085`,
})