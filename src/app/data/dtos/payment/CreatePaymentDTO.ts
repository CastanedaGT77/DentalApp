export class CreatePaymentDto {
    patientId: number;
    name: string;
    phoneNumber: string;
    address: string;
    public details: {
        patientTreatmentDetailId: number;
        amount: number;
    };
}