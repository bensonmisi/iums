import { IsPositive } from "class-validator";

export class SettleDto{
    @IsPositive()
    suspenseId:number

    @IsPositive()
    invoiceId:number
}