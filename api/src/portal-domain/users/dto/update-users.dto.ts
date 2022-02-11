import { PartialType } from "@nestjs/mapped-types";
import { CreateBidderUsersDto } from "./create-users.dto";

export class UpdateBidderUsersDto extends PartialType(CreateBidderUsersDto){}