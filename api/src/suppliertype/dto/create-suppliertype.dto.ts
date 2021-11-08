import { IsNotEmpty } from "class-validator";

export class CreateSuppliertypeDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    allowed_categories:string
}
