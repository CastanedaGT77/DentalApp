export class CreateTreatmentDto {
    //public id: number;
    public name: string;
    public quotation: boolean;
    public treatmentTypes: {
        treatmentTypeId: number;
        price: number;
        piece: string;
    };
    public description: string;
}
