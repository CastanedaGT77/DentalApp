export class createAppointmentDTO {
    // public id: number;
    public patientId: number;
    public branchId: number;
    public assignedUser: number;
    public appointmentDate: string | null;
    public reason: string;
    public startHour: string;
    public endHour: string;

}