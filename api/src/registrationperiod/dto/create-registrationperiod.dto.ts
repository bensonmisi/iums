import { IsNotEmpty } from "class-validator";

export class CreateRegistrationperiodDto {
    @IsNotEmpty()
    regyear:number
}
