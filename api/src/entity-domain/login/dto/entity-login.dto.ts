import { IsEmail, IsNotEmpty } from "class-validator";

export class EntityLoginDto{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string
}