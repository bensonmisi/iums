import { IsNotEmpty } from "class-validator";

export class AssignSubmoduleDto{
    @IsNotEmpty()
    roleId:number

    @IsNotEmpty()
    submoduleId:number
}