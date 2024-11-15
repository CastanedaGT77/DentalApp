export class CitaModel {
    public id: number;
    public branchId: any;
    public assignedUser: any;
    public appointmentDate: string;  // formato 'dd/MM/yyyy'
    public startHour: string;        // formato 'HH:mm'
    public endHour: string;          // formato 'HH:mm'
    public reason: string;
    public patientId: {
        id: number;
        firstName: string;
        lastName: string;
        profileImage: string;
    };
    public status: number;
}
