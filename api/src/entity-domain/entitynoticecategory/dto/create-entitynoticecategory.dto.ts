import { IsNotEmpty } from "class-validator";

export class CreateEntityNoticeCategoryDto{
   
    @IsNotEmpty()
    noticeId:number

    @IsNotEmpty()
     categoryId:number
    
}