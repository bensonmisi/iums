import { IsNotEmpty } from "class-validator";

export class CreateDocumentcommentDto {
    @IsNotEmpty()
    accountId:number

    @IsNotEmpty()
    comment:string

    administratorId?:number
}
