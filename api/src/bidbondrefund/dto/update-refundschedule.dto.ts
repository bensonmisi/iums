import { IsNotEmpty } from "class-validator";

export class UpdaterefundscheduleDto{
    @IsNotEmpty()
    refunded_on:string

    @IsNotEmpty()
    referencenumber:string

    status?:string
}