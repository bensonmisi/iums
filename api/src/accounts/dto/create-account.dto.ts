import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    sector:string

    @IsNotEmpty()
    suppliertype_id:number

    @IsNotEmpty()
    locality:string

    @IsNotEmpty()
    country:string

    @IsNotEmpty()
    city:string

    province?:string

    district?:string

    
}
