import { IsNotEmpty } from "class-validator";

export class CreateUomDto {
    @IsNotEmpty()
    name:string
}
