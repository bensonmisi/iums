import { IsNotEmpty } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty()
    fromDate:string

    @IsNotEmpty()
    toDate:string

    status?:string
}
