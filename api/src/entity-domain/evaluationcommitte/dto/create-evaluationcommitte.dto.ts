import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateEvaluationcommitteDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    surname:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    jobtitle:string
    
    entityuserId:number
    procuremententityId?:number
}
