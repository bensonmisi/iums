import { IsNotEmpty } from "class-validator";

export class CreateBankAccountDto{

    @IsNotEmpty()
    name:string


    @IsNotEmpty()
    accountname:string

    @IsNotEmpty()
    currencyId:number

    @IsNotEmpty()
    accountnumber

    @IsNotEmpty()
    branch:string

    @IsNotEmpty()
    branchcode:string

    swiftcode?:string

   userId?:number
   letter?:string
   accountId:number

}