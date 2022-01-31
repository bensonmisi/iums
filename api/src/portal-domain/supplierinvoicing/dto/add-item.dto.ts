import { IsNotEmpty } from "class-validator";

export class AddItemDto{
    @IsNotEmpty()
    categoryId:number

    @IsNotEmpty()
    regyear:number

    @IsNotEmpty()
    option:string

    @IsNotEmpty()
    currencyId:number
}