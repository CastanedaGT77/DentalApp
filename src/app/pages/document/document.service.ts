import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from "src/app/axios/axiosConfig";


@Injectable()
export class DocumentService {

    async getFileCategories() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/fileCategory');
            return response.data;
        } catch (error) {
            console.error("Error al obtener categories:", error);
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

    async getDocument(fileCode: string) {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/files/${fileCode}`, {
                responseType: 'blob' // Importante para recibir datos binarios
            });
            return response.data; // Retorna el blob del archivo
        } catch (error) {
            console.error("Error al obtener documento:", error);
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

    async cargarDocumento(request: FormData) {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/files', request);
            return response.data; // Devuelve la respuesta completa del backend
        } catch (error) {
            console.error("Error al cargar el documento:", error);
            throw error; // Lanza el error para que sea manejado en el componente
        }
    }
    
}