import { IsNotEmpty } from "class-validator";

export class CreateBankdetailDto {
    
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    accountId:number

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

    status?:string
    swiftcode?:string
    letter?:string
    requestedBy?:number

    

}
