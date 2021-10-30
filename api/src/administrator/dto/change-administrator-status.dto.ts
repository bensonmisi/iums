import { IsNotEmpty } from "class-validator";

export class ChangeAdministratorStatusDto{
    @IsNotEmpty()
    id:number
    @IsNotEmpty()
    status:string
}