import { PartialType } from "@nestjs/mapped-types";
import { CreateEntityNoticeDto } from "./create-entitynotice.dto";

export class UpdateEntityNoticeDto extends PartialType(CreateEntityNoticeDto){}