import { IsNotEmpty } from "class-validator";

export class CreateAccountnumberDto {
    @IsNotEmpty()
    accountnumber:string

    @IsNotEmpty()
    currency:string

    @IsNotEmpty()
    type:string

    status?:string
}
