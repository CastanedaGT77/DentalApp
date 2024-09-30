import axios from 'axios';
import { Router } from '@angular/router'; // Necesitamos inyectar el Router

export const axiosClient = axios.create({
    baseURL: 'https://castaguate.duckdns.org/api',
    timeout: 5000
});

let router: Router;

export const setAxiosClientRouter = (r: Router) => {
    router = r;
};

// Interceptor para agregar el token
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Si recibimos un 401 o 403, el token puede haber expirado
        debugger;
        if (error.response && (error.response.code === 401 || error.response.code === 403 
            || error.response.status === 401 || error.response.status === 403)) {
            // Limpiamos el token de localStorage y redirigimos al login
            localStorage.removeItem('access_token');
            if (router) {
                router.navigate(['/authentication/login']);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
