export class Car {
    uid!: string;
    manufacturer!: string;
    model!: string;
    year!: number;
    price!: number;
    place!: string;
    engine!: number;
    transsimission!: string;
    images: any[] = [];
    type!: string;
    fuelType!: string;
    fuelConsumptionCity!: number;
    fuelConsumptionHighway!: number;
    user_id!: string;
    favoritesBtn: boolean = false;
    uploadedDate!: any;
}