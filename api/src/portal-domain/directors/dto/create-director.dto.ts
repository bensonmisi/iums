import { IsNotEmpty } from "class-validator";

export class CreateDirectorDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    idnumber:string

    @IsNotEmpty()
    gender:string

    accountId?:number
    filename:string
}
