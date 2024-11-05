import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from "src/app/axios/axiosConfig";


@Injectable()
export class CompanyService {

    async getCompanyProperties(id: any) {
        try {
            const response = await axiosClient.get(`/company/properties/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener properties:", error);
            return null;
        }
      }
    
}