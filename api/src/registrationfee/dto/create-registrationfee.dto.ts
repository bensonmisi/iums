import { IsNotEmpty } from "class-validator";

export class CreateRegistrationfeeDto {
    @IsNotEmpty()
    locality:string

    @IsNotEmpty()
    action:string

    @IsNotEmpty()
    currencyId:number

    @IsNotEmpty()
    price:string
}
