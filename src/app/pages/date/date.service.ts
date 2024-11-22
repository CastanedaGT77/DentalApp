import { Injectable } from "@angular/core";
import { CitaModel } from "./models/CitaExample";
import { axiosClient } from "src/app/axios/axiosConfig";
import { createAppointmentDTO } from "src/app/data/dtos/appointment/createAppointmentDTO";
import { HttpStatusCode } from "axios";
import { updateAppointmentDTO } from "src/app/data/dtos/appointment/updateAppointmentDTO";
import { DeleteAppointment } from "./delete/delete-appointment.component";
import { finishAppointmentDTO } from "src/app/data/dtos/appointment/finishAppointmentDTO";



@Injectable({
  providedIn: 'root', // Esto lo hace accesible en toda la aplicación
})

export class DateService {

  async getAppointment(): Promise<CitaModel[]> {
    try {
      axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
      const response = await axiosClient.get('/appointment/all');
      return response.data.data; // Accede a la propiedad 'data'
    } catch (error) {
      console.error("Error al obtener citas:", error);
      return [];
    }
  }

  //citas por paciente
  async getAppointmentPacient(id: number) {
    try {
        axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
        const response = await axiosClient.get(`/appointment/patient/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener citas:", error);
        return null;
    }
  }
  
  async createAppointment(data: Partial<createAppointmentDTO>) {
    try {
        axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
        const response = await axiosClient.post('/appointment', data);
        return response.data; // Retorna la respuesta completa del backend
    } catch (error) {
        console.error('Error al crear la cita:', error);
        return null;
    }
  }

  async updateAppointment(requestData: Partial<updateAppointmentDTO>){
    try {
        axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
        const response = await axiosClient.put('/appointment', requestData);
        if(response && response.data.code === HttpStatusCode.InternalServerError)
            throw Error();
        return response.data;
    } catch(error){
        return null;
    }
  }

  async deleteAppointment(id: number): Promise<boolean|null> {
    try {
        axiosClient.defaults.headers.common['Authorization'] = 'Bearer 1031283sdasdsa';
        await axiosClient.delete('/appointment', { data: {id} });
        return true;
    } catch (error) {
        return null;
    }
  }       

  //empezar cita
  async startAppointment(id: number) {
    try {
        const response = await axiosClient.get(`/appointment/start/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al empezar citas", error);
        return null;
    }
  }

  //finalizar la cita
  async finishAppointment(data: Partial<finishAppointmentDTO>) {
    try {
        const response = await axiosClient.post('/appointment/finish', data);
        return response.data; // Retorna la respuesta completa del backend
    } catch (error) {
        console.error('Error al finalizar la cita:', error);
        return null;
    }
  }
}