import { IsNotEmpty } from "class-validator";

export class CreateAuthorityinvoiceuploadDto {
    @IsNotEmpty()
    bank:string

    @IsNotEmpty()
    amount:string

    @IsNotEmpty()
    transdate:string

    @IsNotEmpty()
    filename:string


    authorityinvoiceId:number
}
