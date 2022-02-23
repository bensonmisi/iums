import { IsNotEmpty } from "class-validator";

export class CreateProcurementcategoryDto {

    @IsNotEmpty()
    name:string
}
