import { IsNotEmpty } from "class-validator";

export class CreateSubmoduleDto {
    @IsNotEmpty()
    systemmoduleId:number
    @IsNotEmpty()
    name:string
    @IsNotEmpty()
    icon:string
    @IsNotEmpty()
    url:string
}
