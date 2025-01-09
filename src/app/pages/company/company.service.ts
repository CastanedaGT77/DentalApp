import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from "src/app/axios/axiosConfig";
import { UpdateCompanyDTO } from "src/app/data/dtos/company/UpdateCompanyDTO";
import { UpdateNewDTO } from "src/app/data/dtos/company/UpdateNewDTO";


@Injectable()
export class CompanyService {

    async getCompanyProperties(id: any) {
        try {
            const response = await axiosClient.get(`/company/properties/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener properties:", error);
            return null;
        }
    }

    async updateCompany(requestData: Partial<UpdateCompanyDTO>){
        try {
            const response = await axiosClient.put('/company/properties', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }


    async getAllNews() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/news/all');
            console.log('news back', response)
            return response.data;
        } catch (error) {
            console.error("Error al obtener all news:", error);
            return null;
        }
    }


    async getAvailable() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/news/available');
            return response.data;
        } catch (error) {
            console.error("Error al obtener all news available:", error);
            return null;
        }
    }


    async crearNew(requestData: Partial<UpdateNewDTO>) {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/news', requestData);
            return response; // Devuelve la respuesta completa del backend
        } catch (error) {
            console.error("Error al cargar el documento:", error);
            throw error; // Lanza el error para que sea manejado en el componente
        }
    }

    async deleteNew(id: number): Promise<boolean|null> {
        try {
            const response = await axiosClient.delete(`/news/${id}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }     


    async updateNew(requestData: Partial<UpdateNewDTO>){
        try {
            const response = await axiosClient.put('/news', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }


    async toggleNewsAvailable(id: number) {
        try {
          const response = await axiosClient.put(`/news/toggle/${id}`);
          return response.data; // Devuelve la respuesta
        } catch (error) {
          console.error('Error al cambiar el estado de disponibilidad:', error);
          throw error; // Lanza el error para manejarlo en el componente
        }
    }
}