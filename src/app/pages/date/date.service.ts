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
                    hour: "14:30",
                    hourF: "15:00"
                },
                {
                    id: 1,
                    patient: "Marco",
                    description: "Sin Muelas",
                    appointmentDate: "15/07/2024",
                    hour: "14:05",
                    hourF: "14:30"
                },
                {
                    id: 1,
                    patient: "Meli",
                    description: "Sin el Palido",
                    appointmentDate: "14/07/2024",
                    hour: "15:00",
                    hourF: "15:50"
                },
                {
                    id: 1,
                    patient: "Meli",
                    description: "Sin el Palido",
                    appointmentDate: "14/07/2024",
                    hour: "15:00",
                    hourF: "15:50"
                },
                {
                    id: 1,
                    patient: "Meli",
                    description: "Sin el Palido",
                    appointmentDate: "14/07/2024",
                    hour: "15:00",
                    hourF: "15:50"
                },
                {
                    id: 1,
                    patient: "Meli",
                    description: "Sin el Palido",
                    appointmentDate: "14/07/2024",
                    hour: "15:00",
                    hourF: "15:50"
                },
                {
                    id: 1,
                    patient: "Meli",
                    description: "Sin el Palido",
                    appointmentDate: "14/07/2024",
                    hour: "15:00",
                    hourF: "15:50"
                },
                {
                    id: 1,
                    patient: "Meli",
                    description: "Sin el Palido",
                    appointmentDate: "14/07/2024",
                    hour: "15:00",
                    hourF: "15:50"
                }
            ];
            return appointments;
        } catch(error){
            return [];
        }
    }

}