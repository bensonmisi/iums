import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    sector:string

    @IsNotEmpty()
    suppliertypeId:number

  

    @IsNotEmpty()
    country:string

    @IsNotEmpty()
    city:string

    province?:string

    district?:string

    locality?:string

    
}
