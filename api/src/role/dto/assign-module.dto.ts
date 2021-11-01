import { IsNotEmpty } from "class-validator";

export class AssignModuleDto{
    @IsNotEmpty()
    roleId:number

    @IsNotEmpty()
    systemmoduleId:number
}