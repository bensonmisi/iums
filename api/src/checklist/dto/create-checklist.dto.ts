import { IsNotEmpty } from "class-validator";

export class CreateChecklistDto {
    @IsNotEmpty()
    procurementcategoryId:number
}
