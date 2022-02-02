import { IsNotEmpty } from "class-validator";

export class CreatePaynowPaymentDto {
    @IsNotEmpty()
    amount:number
}
