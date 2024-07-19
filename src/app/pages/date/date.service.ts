import { Injectable } from "@angular/core";
import { CitaModel } from "./models/CitaExample";
import { axiosClient } from "src/app/axios/axiosConfig";
import { createAppointmentDTO } from "src/app/data/dtos/appointment/createAppointmentDTO";
import { HttpStatusCode } from "axios";
import { updateAppointmentDTO } from "src/app/data/dtos/appointment/updateAppointmentDTO";



@Injectable()
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
}