import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from 'src/app/axios/axiosConfig';
import { CreateTreatmentTypeDto } from '../../data/dtos/treatmentType/CreateTreatmentTypeDTO';
import { UpdateTreatmentTypeDto } from '../../data/dtos/treatmentType/UpdateTreatmentTypeDTO';


@Injectable()
export class TreatmentTypeService {

    async getTreatmentTypes() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/treatmentType');
            return response.data;
        } catch (error) {
            console.error("Error al obtener treatmentTypes:", error);
            return null;
        }
    }

    async createTreatmentType(requestData: Partial<CreateTreatmentTypeDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/treatmentType', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data.id;
        } catch(error){
            return null;
        }
    }

    async updateTreatmentType(requestData: Partial<UpdateTreatmentTypeDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.put('/treatmentType', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data.id;
        } catch(error){
            return null;
        }
    }

    async deleteTreatmentType(id: number): Promise<boolean|null> {
        try {
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer 1031283sdasdsa';
            await axiosClient.delete('/treatmentType', { data: {id} });
            return true;
        } catch (error) {
            return null;
        }
    }       

}