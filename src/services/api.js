import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    // baseURL: 'http://54.234.236.19:8080'
})