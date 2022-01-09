import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticetypeDto } from './create-noticetype.dto';

export class UpdateNoticetypeDto extends PartialType(CreateNoticetypeDto) {}
