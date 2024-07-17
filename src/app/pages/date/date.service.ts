import { Injectable } from "@angular/core";
import { CitaModel } from "./models/CitaExample";
import { axiosClient } from "src/app/axios/axiosConfig";



@Injectable()
export class DateService {

  async getAppointment(): Promise<CitaModel[]> {
    try {
      axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
      const response = await axiosClient.get('/appointment');
      return response.data.data; // Accede a la propiedad 'data'
    } catch (error) {
      console.error("Error al obtener citas:", error);
      return [];
    }
  }
}