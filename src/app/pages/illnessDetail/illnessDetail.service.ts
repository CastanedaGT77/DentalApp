import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from 'src/app/axios/axiosConfig';
import { CreateIllnessDetailDto } from "src/app/data/dtos/IllnessDetail/CreateIllnessDetailDTO";
import { UpdateIllnessDetailDto } from "src/app/data/dtos/IllnessDetail/UpdateIllnessDetailDTO";

@Injectable()
export class IllnessDetailService {

    async getIllnessDetails() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/illnessDetail/all');
            return response.data;
        } catch (error) {
            console.error("Error al obtener illnessdetails:", error);
            return null;
        }
    }

    async createIllnessDetail(requestData: Partial<CreateIllnessDetailDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/illnessDetail', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async updateIllnessDetail(requestData: Partial<UpdateIllnessDetailDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.put('/illnessDetail', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async deleteIllnessDetail(id: number): Promise<boolean|null> {
        try {
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer 1031283sdasdsa';
            await axiosClient.delete('/illnessDetail', { data: {id} });
            return true;
        } catch (error) {
            return null;
        }
    }       
}
