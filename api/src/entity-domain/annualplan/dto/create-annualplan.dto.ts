import { IsNotEmpty } from "class-validator"

export class CreateAnnualplanDto {
   
    @IsNotEmpty()
    description:string

    @IsNotEmpty()
    quantity:string

    @IsNotEmpty()
    cost:string

    @IsNotEmpty()
    uomId:number 

    @IsNotEmpty()
    noticetypeId:number

    @IsNotEmpty()
    spoc:string

    @IsNotEmpty()
    rate_of_purchase:string

    @IsNotEmpty()
    date_of_purchase:string

    @IsNotEmpty()
    currencyId:number

    @IsNotEmpty()
    cycle_time:string

    @IsNotEmpty()
    prequalification:string

    @IsNotEmpty()
    external_lead_time:string

    @IsNotEmpty()
    source_of_funds:string

    @IsNotEmpty()
    procurementcategoryId:number

    @IsNotEmpty()
    procurementclassificationId:number

    annualcost?:string
    procuremententityId:number
    year:number
    author:number


}

