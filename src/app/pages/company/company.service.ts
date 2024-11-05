import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from "src/app/axios/axiosConfig";
import { UpdateCompanyDTO } from "src/app/data/dtos/company/UpdateCompanyDTO";


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

    async updateCompany(requestData: Partial<UpdateCompanyDTO>){
        try {
            const response = await axiosClient.put('/company/properties', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }
    
}