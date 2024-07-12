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
                    appointmentDate: "14/07/2024",
                    hour: "14:30"
                },
                {
                    id: 1,
                    patient: "Marco",
                    description: "Sin Muelas",
                    appointmentDate: "15/07/2024",
                    hour: "14:05"
                },
                {
                    id: 1,
                    patient: "Meli",
                    description: "Sin el Palido",
                    appointmentDate: "14/07/2024",
                    hour: "14:45"
                }
            ];
            return appointments;
        } catch(error){
            return [];
        }
    }

}