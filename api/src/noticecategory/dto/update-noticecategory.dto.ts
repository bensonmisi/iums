import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticecategoryDto } from './create-noticecategory.dto';

export class UpdateNoticecategoryDto extends PartialType(CreateNoticecategoryDto) {}
