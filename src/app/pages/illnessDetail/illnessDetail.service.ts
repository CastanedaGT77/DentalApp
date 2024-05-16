import { Injectable } from "@angular/core";
import { axiosClient } from 'src/app/axios/axiosConfig';

@Injectable()
export class IllnessDetailService {

    async getIllnessDetails(){
        try{
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/illnessDetail');
            return response.data;
        }catch(error){
            console.error("Error al obtener detalles:", error);
            return null;
        }
    }
}