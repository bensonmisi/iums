import { IsEmail, IsNotEmpty, Min } from "class-validator";

export class RegisterDto{
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    surname:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @Min(10)
    password:string

    @IsNotEmpty()
    company:string

    @IsNotEmpty()
    suppliertypeId:number

    @IsNotEmpty()
    country:string

    @IsNotEmpty()
    city:string

    district?:string
    province?:string
    roleId?:number
    accountId?:number
    locality?:string

}