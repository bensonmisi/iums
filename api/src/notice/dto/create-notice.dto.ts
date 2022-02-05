import { IsNotEmpty } from "class-validator";

export class CreateNoticeDto {
    @IsNotEmpty()
    procuremententityId:number

    @IsNotEmpty()
    tendernumber:string

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

    tendernumber2?:string
    year?:number


}
