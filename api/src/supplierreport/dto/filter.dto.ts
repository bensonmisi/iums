import { IsNotEmpty } from "class-validator";

export class FilterDto{
    @IsNotEmpty()
    from:string

    
}