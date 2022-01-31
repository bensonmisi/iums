import { IsEmail, IsNotEmpty, Min } from "class-validator";

export class BidderChangePasswordDto{
    @IsNotEmpty()
    @Min(10)
    password:string

}