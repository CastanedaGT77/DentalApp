import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from 'src/app/axios/axiosConfig';
import { CreateUserDto } from "src/app/data/dtos/user/CreateUserDTO";
import { UpdateUserDto } from "src/app/data/dtos/user/UpdateUserDTO";

@Injectable()
export class UserService {

    async getUsers(){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/user');
            return response.data;
        } catch (error) {
            console.error("Error al obtener users:", error);
            return null;
        }
    }

    async createUser(requestData: Partial<CreateUserDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/user', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async updateUser(requestData: Partial<UpdateUserDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.put('/user', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }


}