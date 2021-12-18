import { IsNotEmpty } from "class-validator";

export class CreateTenderfeetypeDto {
    @IsNotEmpty()
    name:string

    required?:string
    
}
