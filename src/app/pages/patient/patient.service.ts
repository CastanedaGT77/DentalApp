import { Injectable } from '@angular/core';
import { CreatePatientDto } from 'src/app/data/dtos/patient/CreatePatientDto';
import { axiosClient } from 'src/app/axios/axiosConfig';

@Injectable()
export class PatientService {

    constructor(){
    }

    async createPatient(requestData: Partial<CreatePatientDto>){
        try {
            console.log("DATA FORM CREATE PATIENT SERVICE:", requestData);
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/patient', requestData);
            debugger;
            return true;
        } catch(error){
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
        
}