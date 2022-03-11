import { IsNotEmpty } from "class-validator";

export class CreateNoticeawardDto {
    @IsNotEmpty()
    regnumber:string

    @IsNotEmpty()
    certificatenumber:string

    @IsNotEmpty()
    quantity:number

    @IsNotEmpty()
    currencyId:number

    @IsNotEmpty()
    value:string
    
    @IsNotEmpty()
    noticeproductId:number

    entityuserId?:number
    feecodes?:string
    accountId?:number
   
}
