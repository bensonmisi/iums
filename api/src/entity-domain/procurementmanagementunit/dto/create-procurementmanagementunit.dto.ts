import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateProcurementmanagementunitDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    surname:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    phonenumber:string

    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    jobtitle:string
    
    hasaccount:string
    entityuserId:number
    procuremententityId?:number
}
