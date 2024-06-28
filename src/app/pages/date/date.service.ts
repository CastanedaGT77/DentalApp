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
                    appointmentDate: "14/06/2024"
                },
                {
                    id: 1,
                    patient: "Marco",
                    description: "Sin Muelas",
                    appointmentDate: "15/06/2024"
                }
            ];
            return appointments;
        } catch(error){
            return [];
        }
    }

}