import axios from 'axios';

export const SpringBackend = axios.create({
    baseURL: `http://localhost:8085/`,
})