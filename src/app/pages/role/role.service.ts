import { Injectable } from '@angular/core';
import { axiosClient } from 'src/app/axios/axiosConfig';

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
}