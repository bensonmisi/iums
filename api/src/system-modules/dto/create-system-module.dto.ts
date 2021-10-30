import { IsNotEmpty } from "class-validator";

export class CreateSystemModuleDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    icon:string

    @IsNotEmpty()
    widget:string

    @IsNotEmpty()
    description:string
}
