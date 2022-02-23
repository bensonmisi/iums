import { IsEmail, IsNotEmpty, Min } from "class-validator"

export class CreateProcurementEntityUserDto {
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
    roleId:number

    password?:string



}
