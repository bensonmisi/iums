import { IsNotEmpty } from "class-validator";

export class CreateContactfeethresholdDto {
    @IsNotEmpty()
    locality:string

    @IsNotEmpty()
    currencyId:number

    @IsNotEmpty()
    lower:string

    @IsNotEmpty()
    upper:string

    @IsNotEmpty()
    cost:string
}
