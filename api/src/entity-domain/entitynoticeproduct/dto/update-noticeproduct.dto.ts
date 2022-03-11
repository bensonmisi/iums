import { PartialType } from "@nestjs/mapped-types";
import { CreateNoticeProductDto } from "./create-noticeproduct.dto";

export class UpdateNoticeProductDto extends PartialType(CreateNoticeProductDto){}