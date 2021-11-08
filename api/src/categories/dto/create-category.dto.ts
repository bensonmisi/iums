import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    code:string

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    sectionId:number

    status?:string
}
