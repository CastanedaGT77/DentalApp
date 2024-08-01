import { Injectable } from "@angular/core";
import { HttpStatusCode } from "axios";
import { axiosClient } from 'src/app/axios/axiosConfig';
import { CreatePaymentDto } from "src/app/data/dtos/payment/CreatePaymentDTO";

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

    //hacer pago por paciente
    async createPayment(requestData: Partial<CreatePaymentDto>){
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/payment', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

}