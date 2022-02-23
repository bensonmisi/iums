import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateProfileDto{
@IsNotEmpty()
name:string

@IsNotEmpty()
surname:string

@IsNotEmpty()
@IsEmail()
email:string


@IsNotEmpty()
phonenumber:string

@IsNotEmpty()
jobtitle:string

@IsNotEmpty()
title:string

}