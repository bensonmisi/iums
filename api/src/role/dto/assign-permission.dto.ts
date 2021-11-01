import { IsNotEmpty } from "class-validator";

export class AssignPermissionDto{
    @IsNotEmpty()
    roleId:number
    @IsNotEmpty()
    permissionId:number
}