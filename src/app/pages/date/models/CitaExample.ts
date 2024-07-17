export class CitaModel {
    public id: number;
    public patient: string;
    public description: string;
    appointmentDate: string;  // formato 'dd/MM/yyyy'
    startHour: string;             // formato 'HH:Smm'
    endHour: string;            // formato 'HH:mm'
    observations: string;
    patientId: number;
}