import { IsNotEmpty } from "class-validator";

export class CreateChecklistquestionDto {
    @IsNotEmpty()
    question:string

    checklistId:number
}
