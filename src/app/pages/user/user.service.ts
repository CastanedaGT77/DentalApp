import { Injectable } from "@angular/core";
import { axiosClient } from 'src/app/axios/axiosConfig';

@Injectable()
export class UserService {

    async getUsers(){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/user/all');
            return response.data;
        } catch (error) {
            console.error("Error al obtener users:", error);
            return null;
        }
    }
}