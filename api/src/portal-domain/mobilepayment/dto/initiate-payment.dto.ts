import { IsNotEmpty } from "class-validator";

export class InitiatePaymentDto{
    @IsNotEmpty()
    phone:string

    @IsNotEmpty()
    amount:string

    @IsNotEmpty()
    mode:string
}