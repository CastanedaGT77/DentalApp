import { Injectable } from '@angular/core';
import { HttpStatusCode } from 'axios';
import { axiosClient } from 'src/app/axios/axiosConfig';
import { CreateRoleDto } from 'src/app/data/dtos/role/CreateRoleDTO';
import { UpdateRoleDto } from 'src/app/data/dtos/role/UpdateRoleDTO';

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
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async updateRole(requestData: Partial<UpdateRoleDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.put('/roles', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    async deleteRole(id: number): Promise<boolean|null> {
        try {
            axiosClient.defaults.headers.common['Authorization'] = 'Bearer 1031283sdasdsa';
            await axiosClient.delete('/roles', { data: {id} });
            return true;
        } catch (error) {
            return null;
        }
    }     
}
