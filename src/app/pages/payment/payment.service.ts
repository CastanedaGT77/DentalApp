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

    //todos los pagos 
    async getAllPayments(){
        try{
            const response = await axiosClient.get('/payment/all');
            return response.data;
        }catch(error){
            // Maneja cualquier error y devuelve null
            console.error("Error al obtener todos los pagos:", error);
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

    //hacer pago por paciente antes del recibo
    async createPayment2(requestData: Partial<CreatePaymentDto>){
        try {
            //axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.post('/payment', requestData);
            if(response && response.data.code === HttpStatusCode.InternalServerError)
                throw Error();
            return response.data;
        } catch(error){
            return null;
        }
    }

    //hacer pago por paciente
    async createPayment(requestData: Partial<CreatePaymentDto>){
    try {
        const response = await axiosClient.post('/payment', requestData, {
            responseType: 'blob'  // Cambia el tipo de respuesta a 'blob' para manejar archivos binarios
        });

        // Verificar si la respuesta tiene un código de error
        if (response && response.status === HttpStatusCode.InternalServerError) {
            throw new Error('Error interno del servidor');
        }

        return response.data;  // Esto será un blob ahora
    } catch (error) {
        console.error('Error al crear el pago:', error);
        return null;
    }
    }

    async getDocument(fileCode: any) {
        try {
            axiosClient.defaults.headers.common['Authorization'] = "Bearer 1031283sdasdsa";
            const response = await axiosClient.get(`/payment/receipt/${fileCode}`, {
                responseType: 'blob' // Importante para recibir datos binarios
            });
            return response.data; // Retorna el blob del archivo
        } catch (error) {
            console.error("Error al obtener documento:", error);
            return null;
        }
    }

}