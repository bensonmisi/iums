import { IsNotEmpty } from "class-validator";

export class CreateProcurementclassDto {
    @IsNotEmpty()
    name:string
}
