export class CreatePaymentDto {
    name: string;
    phoneNumber: string;
    address: string;
    public details: {
        patientTreatmentDetailId: number;
        amount: number;
    };
}