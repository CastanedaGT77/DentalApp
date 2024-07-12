import axios from 'axios';

export const axiosClient = axios.create({
    // baseURL: 'http://localhost:3000/api/',
    baseURL: 'http://137.184.192.120:3005/api',

    timeout: 5000
});