import { IsNotEmpty } from "class-validator";

export class UpdateBidderAccountDto{
    
    @IsNotEmpty()
    suppliertypeId:number

    @IsNotEmpty()
    country:string

    @IsNotEmpty()
    city:string

    district?:string
    province?:string
    locality?:string
}