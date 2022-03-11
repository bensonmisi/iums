import { PartialType } from "@nestjs/mapped-types";
import { CreateEntityNoticeCategoryDto } from "./create-entitynoticecategory.dto";

export class UpdateEntityNoticeCategoryDto extends PartialType(CreateEntityNoticeCategoryDto){}