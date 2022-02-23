import { IsNotEmpty } from "class-validator";

export class CreateProcurementclassificationDto {
    @IsNotEmpty()
    name:string
}
