import { IsEmail, IsNotEmpty } from "class-validator";

export class personalDto{
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    surname:string

    @IsNotEmpty()
    @IsEmail()
    email:string
}