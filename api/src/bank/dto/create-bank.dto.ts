import { IsNotEmpty } from "class-validator";

export class CreateBankDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    code:string
}
