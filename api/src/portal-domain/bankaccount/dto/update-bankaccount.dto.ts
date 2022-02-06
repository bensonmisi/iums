import { PartialType } from "@nestjs/mapped-types";
import { CreateBankAccountDto } from "./create-bankaccount.dto";

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto){

}