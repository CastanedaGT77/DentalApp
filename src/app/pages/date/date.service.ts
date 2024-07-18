import { Injectable } from "@angular/core";
import { CitaModel } from "./models/CitaExample";
import { axiosClient } from "src/app/axios/axiosConfig";
import { createAppointmentDTO } from "src/app/data/dtos/appointment/createAppointmentDTO";
import { HttpStatusCode } from "axios";



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
  
  async createAppointment(requestData: Partial<createAppointmentDTO>){
    try {
        axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
        const response = await axiosClient.post('/appointment', requestData);
        if(response && response.data.code === HttpStatusCode.InternalServerError)
            throw Error();
        return response.data.id;
    } catch(error){
        return error;
    }
  }

}