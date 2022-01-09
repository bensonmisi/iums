import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticefeeDto } from './create-noticefee.dto';

export class UpdateNoticefeeDto extends PartialType(CreateNoticefeeDto) {}
