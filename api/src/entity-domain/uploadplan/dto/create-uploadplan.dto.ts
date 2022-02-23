import { IsNotEmpty } from "class-validator";

export class CreateUploadplanDto {
   @IsNotEmpty()
   filename:string
   
   @IsNotEmpty()
   authorityapplicationId:number

   entityuserId?:number
}
