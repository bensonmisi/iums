import { IsNotEmpty } from "class-validator";

export class CreateNoticeProductDto{
    @IsNotEmpty()
    description

    @IsNotEmpty()
    quantity:string

    @IsNotEmpty()
    noticeId:number

    @IsNotEmpty()
    isplanned:string

    annualplanId?:number

    
}