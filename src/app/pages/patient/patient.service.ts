import { Injectable } from '@angular/core';
import { CreatePatientDto } from 'src/app/data/dtos/patient/CreatePatientDto';
import { axiosClient } from 'src/app/axios/axiosConfig';
import { HttpStatusCode } from 'axios';
import { SetProfileImageDto } from 'src/app/data/dtos/patient/SetProfileImageDto';
import { UpdatePatientDto } from 'src/app/data/dtos/patient/UpdatePatientDto';

@Injectable()
export class PatientService {

    capturedImage: string | null = null;

    constructor(){
    }

    async createPatient(requestData: Partial<CreatePatientDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/patient', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async updatePatient(requestData: Partial<UpdatePatientDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.put('/patient', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async setProfileImage(request: Partial<SetProfileImageDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/patient/profileImage', request);
            return response.data.id;
        } catch(error){
            return null;
        }
    }

    async getProfileImage(id: number){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/patient/profileImage/${id}`);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            console.log(error);
            return null;
        }
    }

    //pacientes aprobados 
    async getPatient(){
        try{
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/patient/approved');
            return response.data;
        }catch(error){
            // Maneja cualquier error y devuelve null
            console.error("Error al obtener pacientes:", error);
            return null;
        }
    }

    //pacientes sin aprovar 
    async getPatientUnApproved(){
        try{
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/patient/unapproved');
            return response.data;
        }catch(error){
            // Maneja cualquier error y devuelve null
            console.error("Error al obtener pacientes sin aprobar:", error);
            return null;
        }
    }

    //pacientes activos 
    async getPatientActive(){
        try{
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/patient/active');
            return response.data;
        }catch(error){
            // Maneja cualquier error y devuelve null
            console.error("Error al obtener pacientes activos:", error);
            return null;
        }
    }

    //pacientes inactivos 
    async getPatientInactive(){
        try{
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/patient/inactive');
            return response.data;
        }catch(error){
            // Maneja cualquier error y devuelve null
            console.error("Error al obtener pacientes sin activar:", error);
            return null;
        }
    }

    //pacientes todos 
    async getAllPatient(){
        try{
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/patient');
            return response.data;
        }catch(error){
            // Maneja cualquier error y devuelve null
            console.error("Error al obtener todos los pacientes pacientes:", error);
            return null;
        }
    }

    async deletePatient(id: number): Promise<boolean|null> {
        try {
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer 1031283sdasdsa';
            await axiosClient.delete('/patient', { data: {id} });
            return true;
        } catch (error) {
            return null;
        }
    }       
}