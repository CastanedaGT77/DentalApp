import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from 'src/app/axios/axiosConfig';
import { UpdateTreatmentDto } from "src/app/data/dtos/treatment/UpdateTreatmentDTO";
import { CreateTreatmentDto } from "src/app/data/dtos/treatment/CreateTreatmentDTO";
import { CreateTreatmentDetailDTO } from "src/app/data/dtos/treatment/CreateTreatmentDetailDTO";


@Injectable()
export class TreatmentService {

    async getTreatment() {
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/treatment');
            return response.data;
        } catch (error) {
            console.error("Error al obtener treatment:", error);
            return null;
        }
    }

    //tratamientos por paciente
    async getPatientTreatment(id: number) {
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/treatment/patient/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener treatment:", error);
            return null;
        }
    }

    //tratamientos por paciente
    async getPatientTreatmentPending(id: number) {
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/treatment/patient/pending/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pending treatment:", error);
            return null;
        }
    }

     //detalle de un tratamiento por id
     async getTreatmentDetail(id: number) {
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/treatment/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener detalle treatment:", error);
            return null;
        }
    }

    async createTreatment(requestData: Partial<CreateTreatmentDto>){
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/treatment', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async updateTreatment(requestData: Partial<UpdateTreatmentDto>){
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.put('/treatment', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    //no sirve y no tocar
    async deleteTreatment(id: number): Promise<boolean|null> {
        try {
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer 1031283sdasdsa';
            await axiosClient.delete('/illnessDetail', { data: {id} });
            return true;
        } catch (error) {
            return null;
        }
    }      
    
    async createTreatmentDetail(requestData: Partial<CreateTreatmentDetailDTO>){
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/treatment/detail', requestData);
            debugger;
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }
    
    //detalle de un tratamiento por id
    async deleteTreatmentDetail(id: number) {
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.delete(`/treatment/detail/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al eliminar detalle treatment:", error);
            return null;
        }
    }

}