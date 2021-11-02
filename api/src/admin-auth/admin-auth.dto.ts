import { IsNotEmpty } from "class-validator";

export class AdminAuthDto{
    @IsNotEmpty()
    username:string

    @IsNotEmpty()
    password:string
}