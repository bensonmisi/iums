import { IsNotEmpty } from "class-validator";

export class CreateBidderUsersDto{
   
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    surname:string

    @IsNotEmpty()
    email:string

    accountId?:number
    password?:string
    roleId?:number
    username?:string
    resetpassword?:boolean
}