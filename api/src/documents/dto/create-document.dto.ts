import { IsNotEmpty } from "class-validator";

export class CreateDocumentDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    locality:string

    @IsNotEmpty()
    pages:number

    @IsNotEmpty()
    filetype:string

    @IsNotEmpty()
    filesize:string

    suppliertypeId:number
}
