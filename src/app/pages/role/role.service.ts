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
            console.error("Error al obtener permisos:", error);
            return null;
        }
    }

    async getRoles(){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get('/roles/all');
            return response.data;
        } catch(error){
            console.error("Error al obtener roles:", error);
            return null;
        }
    }

    async createRole(requestData: Partial<CreateRoleDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/roles', requestData);
            if(response && response.status !== HttpStatusCode.Created) {
                throw new Error("Error al crear el rol");
            }
            return response.data;
        } catch(error){
            console.error("Error al crear rol:", error);
            return null;
        }
    }
}
