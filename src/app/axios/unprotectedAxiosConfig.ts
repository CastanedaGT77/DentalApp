import axios from 'axios';

// export const axiosClient = axios.create({
//     baseURL: 'https://castaguate.duckdns.org/api',
//     timeout: 5000
// });

export const unprotectedAxiosClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000
});

export default unprotectedAxiosClient;