export class createAppointmentDTO {
    // public id: number;
    public patient: string;
    public description: string;
    appointmentDate: string;  // formato 'dd/MM/yyyy'
    hour: string;             // formato 'HH:Smm'
    hourF: string;            // formato 'HH:mm'
}