import { IsNotEmpty } from "class-validator";

export class changepasswordDto{
    @IsNotEmpty()
    token:string

    @IsNotEmpty()
    password:string
}