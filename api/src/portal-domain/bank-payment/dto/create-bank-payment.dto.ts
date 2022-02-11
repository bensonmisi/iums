import { IsNotEmpty } from "class-validator";

export class CreateBankPaymentDto {

    @IsNotEmpty()
    referencenumber:string

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    paymentdate:string

    @IsNotEmpty()
    amount:string

    filename:string
    invoicenumber?:string

    
}
