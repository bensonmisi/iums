import { IsNotEmpty } from "class-validator";

export class CreateManualtransactionDto {
    @IsNotEmpty()
    source_reference:string

    @IsNotEmpty()
    description:string

    @IsNotEmpty()
    statement_reference:string

    @IsNotEmpty()
    referencenumber:string

    @IsNotEmpty()
    bankId:number

    @IsNotEmpty()
    transactionDate:string

    @IsNotEmpty()
    currency:string

    @IsNotEmpty()
    amount:string
    
}
