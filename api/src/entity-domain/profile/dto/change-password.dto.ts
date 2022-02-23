import { IsNotEmpty, Min } from "class-validator";

export class ChangePasswordDto{
    @IsNotEmpty()
    @Min(10)
    password:string


}