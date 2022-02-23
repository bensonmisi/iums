import { IsNotEmpty } from "class-validator";

export class CreateProcurementClassValidtyDto {
    @IsNotEmpty()
    period:string
}
