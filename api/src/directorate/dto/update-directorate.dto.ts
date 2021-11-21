import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectorateDto } from './create-directorate.dto';

export class UpdateDirectorateDto extends PartialType(CreateDirectorateDto) {}
