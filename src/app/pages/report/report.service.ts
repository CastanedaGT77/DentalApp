import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from "src/app/axios/axiosConfig";

@Injectable()
export class ReportService {

    async getReport() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/report', {
                responseType: 'blob'
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener el reporte PDF:", error);
            return null;
        }
    }
    

    async getReport3(patient: number){

    }

    async getReport2(fecha1: Date | null, fecha2: Date | null){



    }
}