import { Injectable } from "@angular/core";
import { axiosClient } from "src/app/axios/axiosConfig";

@Injectable()
export class BranchService {

    async getBranches() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/branch');
            return response.data;
        } catch (error) {
            console.error("Error al obtener illnessdetails:", error);
            return null;
        }
    }

}