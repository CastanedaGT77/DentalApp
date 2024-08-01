import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from 'src/app/axios/axiosConfig';

@Injectable()
export class PaymentService {

     //pagos por paciente
     async getPatientPayment(id: number) {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/payment/patient/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pagos:", error);
            return null;
        }
    }

    //pagos por paciente
    async getPatientPendingPayment(id: number) {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/payment/pending/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener pagos pendientes:", error);
            return null;
        }
    }

}