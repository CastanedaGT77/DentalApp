import { Injectable } from "@angular/core";
import { axiosClient } from "src/app/axios/axiosConfig";

@Injectable()
export class DashboardService {

    async getUsers() {
        try {
            const response = await axiosClient.get('/dashboard/branchs');
            return response.data;
        } catch (error) {
            console.error("Error al obtener datos:", error);
            return null;
        }
    }

    async getPatients() {
        try {
            const response = await axiosClient.get('/dashboard/patients');
            return response.data;
        } catch (error) {
            console.error("Error al obtener datos:", error);
            return null;
        }
    }

    async getBranchs() {
        try {
            const response = await axiosClient.get('/dashboard/branchs');
            return response.data;
        } catch (error) {
            console.error("Error al obtener datos:", error);
            return null;
        }
    }
    
}