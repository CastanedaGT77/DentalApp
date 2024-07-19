export class CitaModel {
    public id: number;
    public branchId: number;
    public assignedUser: number;
    public appointmentDate: string;  // formato 'dd/MM/yyyy'
    public startHour: string;        // formato 'HH:mm'
    public endHour: string;          // formato 'HH:mm'
    public observations: string;
    public patientId: {
        id: number;
        firstName: string;
        lastName: string;
        profileImage: string;
    };
    public status: number;
}
