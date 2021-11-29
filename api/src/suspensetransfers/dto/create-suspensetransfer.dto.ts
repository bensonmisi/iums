import { IsNotEmpty } from "class-validator";

export class CreateSuspensetransferDto {
    @IsNotEmpty()
    suspenseId:number

    @IsNotEmpty()
    destination:string

    @IsNotEmpty()
    amount:string

    otherregnumber?:string
}
