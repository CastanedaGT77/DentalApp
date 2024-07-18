export class UpdatePatientDto {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    cellPhoneNumber: string;
    email: string;
    city: string;
    address: string;
    recommendedBy: string;
    personInCharge: string;
    birthDate: Date;
    maritalStatus: string;
    occupation: string;
    personalDoctor: string;
    previousDentist: string;
    illnessDetails: number[];
}