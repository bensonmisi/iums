import { IsEmail, IsNotEmpty } from "class-validator";

export class BidderUpdatePersonalDto{
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    surname:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    phone:string
}