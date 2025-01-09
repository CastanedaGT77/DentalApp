import { Injectable } from '@angular/core';
import axiosClient from 'src/app/axios/axiosConfig';
import unprotectedAxiosClient from 'src/app/axios/unprotectedAxiosConfig';

@Injectable()
export class InitialService {

    async getNews() {
        try {
            const response = await axiosClient.get('/public-appointments/news');
            return response.data;
        } catch (error) {
            console.error("Error al obtener las noticias:", error);
            return null;
        }
    }

    async getCompanyProperties() {
        try {
            const response = await axiosClient.get('/public-appointments/properties');
            return response.data;
        } catch (error) {
            console.error("Error al obtener las propiedades:", error);
            return null;
        }
    }

    async getBranches() {
        try {
            const response = await axiosClient.get('/public-appointments/branchs');
            return response.data;
        } catch (error) {
            console.error("Error al obtener las propiedades:", error);
            return null;
        }
    }

}