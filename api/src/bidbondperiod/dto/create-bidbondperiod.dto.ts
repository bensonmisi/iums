import { IsNotEmpty } from "class-validator";

export class CreateBidbondperiodDto {
    @IsNotEmpty()
    days:string
}
