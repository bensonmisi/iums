import { IsNotEmpty } from "class-validator";

export class CreateMailistDto {
    @IsNotEmpty()
    email:string

    accountId?:number
}
