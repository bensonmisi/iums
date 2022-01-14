import { IsNotEmpty } from "class-validator";

export class CreateTaskmanagerDto {
    @IsNotEmpty()
    identifier:string

    @IsNotEmpty()
    type:string

    @IsNotEmpty()
    accountId:number

    administratorId?:number

}
