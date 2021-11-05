import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateAdministratorDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    surname:string
     
    @IsNotEmpty()
    username:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    roleId:number
}
