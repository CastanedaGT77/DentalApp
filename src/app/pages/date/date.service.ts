import { Injectable } from "@angular/core";
import { CitaModel } from "./models/CitaExample";



@Injectable()
export class DateService {

    async getAppointment() : Promise<CitaModel[]> {
        try {
            const appointments: CitaModel[] = [
                {
                    id: 1,
                    patient: "Edvin",
                    description: "Limpieza",
                    appointmentDate: "1/1/2024"
                }
            ];
            return appointments;
        } catch(error){
            return [];
        }
    }

}