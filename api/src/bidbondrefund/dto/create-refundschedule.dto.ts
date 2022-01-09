import { IsNotEmpty } from "class-validator";

export class Refundschedule{
   @IsNotEmpty()
   applicationId:number

   @IsNotEmpty()
   tendernumber:string
   
   @IsNotEmpty()
   bankdetailId:number

   initiator?:number
}