import { IsNotEmpty } from "class-validator";

export class CreateIndividualplanDto {
@IsNotEmpty()
quantity:number

@IsNotEmpty()
date_of_purchase:string

annualplanId:number

}
