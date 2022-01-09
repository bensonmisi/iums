import { IsNotEmpty } from "class-validator";

export class CreateNoticetypeDto {
    @IsNotEmpty()
    name:string

     types?:[]
}
