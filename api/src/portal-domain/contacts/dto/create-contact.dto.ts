import { IsNotEmpty } from "class-validator";

export class CreateContactDto {
    @IsNotEmpty()
    address:string

    @IsNotEmpty()
    phones:string

    @IsNotEmpty()
    emails:string

    accountId?:number
}
