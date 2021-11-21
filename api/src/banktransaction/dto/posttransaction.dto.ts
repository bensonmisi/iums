import { IsNotEmpty } from "class-validator";
export class PostTransactionDto{
   
    authcode:string
    description:string
    trans_date:string
    referencenumber:string
    source_reference:string
    statement_reference:string
    amount:string
    accountnumber:string
    currency:string

}