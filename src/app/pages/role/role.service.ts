import { Injectable } from '@angular/core';
import { HttpStatusCode } from 'axios';
import { axiosClient } from 'src/app/axios/axiosConfig';
import { CreateRoleDto } from 'src/app/data/dtos/role/CreateRoleDTO';

@Injectable()
export class RoleService {

    async getPermissions() {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/roles/permissions');
            return response.data;
        } catch (error) {
            console.error("Error al obtener role:", error);
            return null;
        }
    }

    async getRoles(){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/roles/all');
            return response.data;
        } catch(error){
            console.error("Error al obtener role:", error);
            return null;
        }
    }

    async createRole(requestData: Partial<CreateRoleDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/roles', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }
}