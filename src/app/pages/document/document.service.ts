import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from "src/app/axios/axiosConfig";


@Injectable()
export class DocumentService {

    async getFileCategories() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/files');
            return response.data;
        } catch (error) {
            console.error("Error al obtener documents:", error);
            return null;
        }
    }

    async getAllDocuments() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/files');
            return response.data;
        } catch (error) {
            console.error("Error al obtener documents:", error);
            return null;
        }
    }

    //documentos por paciente
    async getPatientDocuments(id: number) {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/files/patient/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener documentos por paciente:", error);
            return null;
        }
    }

    async cargarDocumento(request: FormData){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/files', request);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data.id;
        } catch(error){
            return null;
        }
    }
    
}