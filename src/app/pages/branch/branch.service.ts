import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from "src/app/axios/axiosConfig";
import { CreateBranchDTO } from "src/app/data/dtos/branch/CreateBranchDTO";
import { UpdateBranchDTO } from "src/app/data/dtos/branch/UpdateBranchDTO";

@Injectable()
export class BranchService {

    async getBranches() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/branch');
            return response.data;
        } catch (error) {
            console.error("Error al obtener branches:", error);
            return null;
        }
    }

    async createBranch(requestData: Partial<CreateBranchDTO>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/branch', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async updateBranch(requestData: Partial<UpdateBranchDTO>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.put('/branch', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async deleteBranch(id: number): Promise<boolean|null> {
        try {
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer 1031283sdasdsa';
            await axiosClient.delete('/branch', { data: {id} });
            return true;
        } catch (error) {
            return null;
        }
    }     
    
}