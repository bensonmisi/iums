import { IsNotEmpty } from "class-validator";

export class SearchSuspenseDto{
    @IsNotEmpty()
    regnumber:string
}