import { IsNotEmpty } from "class-validator";

export class CreateRegistrationoptionDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    duration:number

    creator?:number
}
