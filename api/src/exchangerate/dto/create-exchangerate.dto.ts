import { IsNotEmpty } from "class-validator";

export class CreateExchangerateDto {
    @IsNotEmpty()
    primaryId:number

    @IsNotEmpty()
    secondaryId:number
    
    @IsNotEmpty()
    value:string

    @IsNotEmpty()
    type:string
}
