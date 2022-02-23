import { IsNotEmpty } from "class-validator";

export class CreateOrganogramDto {
    @IsNotEmpty()
    full:string

    @IsNotEmpty()
    pmu:string

    procuremententityId:number
    entityuserId:number
}
