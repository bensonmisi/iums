import { IsNotEmpty } from "class-validator";

export class CreateEntityNoticeDto {
    @IsNotEmpty()
    procuremententityId:number

    @IsNotEmpty()
    currencyId:number

    @IsNotEmpty()
    closingDate:string

    @IsNotEmpty()
    sectionId:number

    @IsNotEmpty()
    noticetypeId:number

    @IsNotEmpty()
    closingTime:string

    @IsNotEmpty()
    title:string

    status?:string

    uuid?:string

    creator?:number

    level?:string

    filename?:string

    categories?:any

    products?:any

    reach:string

    tendernumber?:string

    tendernumber2?:string
    year?:number

    annualplanId?:number

    bidbond?:string

    bidvalue?:number
    bidbondperiodId?:number
    procurementcategoryId:number


}
