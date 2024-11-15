import { Injectable } from '@angular/core';
import unprotectedAxiosClient from 'src/app/axios/unprotectedAxiosConfig';

@Injectable()
export class InitialService {


    async test(){
        try {
            const response = unprotectedAxiosClient.get("/public-appointments");
            return response;
        }
        catch(error){
            return "No funciono la llamada";
        }
    }
}