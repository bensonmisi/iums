import { IsNotEmpty } from "class-validator";

export class CreateNoticefeeDto {
    @IsNotEmpty()
    noticeId:number

    @IsNotEmpty()
    tenderfeetypeId:number

    @IsNotEmpty()
    currencyId:number

    @IsNotEmpty()
    amount:string

    bidbondperiodId?:number

    creator?:number
    level?:string
}
