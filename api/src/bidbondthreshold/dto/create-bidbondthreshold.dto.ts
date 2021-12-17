import { IsNotEmpty } from "class-validator";

export class CreateBidbondthresholdDto {
    @IsNotEmpty()
    locality:string

    @IsNotEmpty()
    currencyId:number

    @IsNotEmpty()
    validityperiod:string

    @IsNotEmpty()
    lowerlimit:string

    @IsNotEmpty()
    upperlimit:string

    @IsNotEmpty()
    amount:string

}
