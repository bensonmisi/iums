import { IsNotEmpty } from "class-validator"

export class ClaimAuthorityInvoiceDto{
    @IsNotEmpty()
    banktransactionId:number

    @IsNotEmpty()
    id:number
}