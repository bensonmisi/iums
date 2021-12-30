import { IsNotEmpty } from "class-validator";

export class CreateTenderapplicationDto {
    @IsNotEmpty()
    tendernumber:string

    @IsNotEmpty()
    amount:string
    
    validityperiod?:string
    closingdate?:string
}
