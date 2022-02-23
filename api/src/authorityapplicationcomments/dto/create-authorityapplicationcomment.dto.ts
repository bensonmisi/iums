import { IsNotEmpty } from "class-validator";

export class CreateAuthorityapplicationcommentDto {
    @IsNotEmpty()
    comment
    
    @IsNotEmpty()
    authorityapplicationId:number

    administratorId:number


}
