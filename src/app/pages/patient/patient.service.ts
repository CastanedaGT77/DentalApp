import { Injectable } from '@angular/core';
import { CreatePatientDto } from 'src/app/data/dtos/patient/CreatePatientDto';
import { axiosClient } from 'src/app/axios/axiosConfig';
import { HttpStatusCode } from 'axios';
import { SetProfileImageDto } from 'src/app/data/dtos/patient/SetProfileImageDto';
import { GetProfileImageDto } from 'src/app/data/dtos/patient/GetProfileImageDto';

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
            return response.data.id;
        } catch(error){
            return null;
        }
    }

    async setProfileImage(request: Partial<SetProfileImageDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/patient/profileImage', request);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
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

    async getPatient(){
        try{
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/patient/all');
            return response.data;
        }catch(error){
            // Maneja cualquier error y devuelve null
            console.error("Error al obtener pacientes:", error);
            return null;
        }
    }

    async deletePatient(id: number): Promise<void> {
        try {
            // Establece el token de autorización si es necesario
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer 1031283sdasdsa';
    
            // Crea un objeto con la propiedad 'id'
            const data = { id: id };
    
            // Realiza la solicitud DELETE al endpoint correspondiente, pasando el objeto 'data' como el cuerpo de la solicitud
            await axiosClient.delete('/patient', { data });
    
            // Si la solicitud se completa sin errores, podemos asumir que la eliminación fue exitosa
            console.log('El paciente se eliminó correctamente.');
        } catch (error) {
            // Comprobamos si error es de tipo Error
            if (error instanceof Error) {
                console.error('Error:', error.message);
                throw new Error('Error al eliminar el paciente: ' + error.message);
            } else {
                // Si no es de tipo Error, manejamos el error de alguna otra manera
                console.error('Error desconocido:', error);
                throw new Error('Error desconocido al intentar eliminar el paciente.');
            }
        }
    }
        
}