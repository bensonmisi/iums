import { IsEmail, IsNotEmpty, Min } from "class-validator"

export class CreateEntityUserDto {
    @IsNotEmpty()
    name:string

    

    @IsNotEmpty()
    surname:string

    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    jobtitle:string

    @IsNotEmpty()
    phonenumber:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @Min(10)
    passwword:string

}
