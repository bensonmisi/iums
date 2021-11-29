import { IsNotEmpty } from "class-validator"

export class DecisionDto{
    @IsNotEmpty()
    id:number
    @IsNotEmpty()
    status:string

    reason?:string
}