import { IsNotEmpty, MinLength } from "class-validator";

export class adminpasswordResetDto{
    @IsNotEmpty()
    token:string
    @IsNotEmpty()
    username:string
    @IsNotEmpty() 
    @MinLength(8)
    password:string
}