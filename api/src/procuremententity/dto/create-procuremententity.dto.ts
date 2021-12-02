import { IsNotEmpty } from "class-validator";

export class CreateProcuremententityDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    slug:string

    @IsNotEmpty()
    city:string

    @IsNotEmpty()
    province:string

    @IsNotEmpty()
    district:string

    @IsNotEmpty()
    sector:string


}
