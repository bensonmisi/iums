import { PartialType } from '@nestjs/mapped-types';
import { CreateMailistDto } from './create-mailist.dto';

export class UpdateMailistDto extends PartialType(CreateMailistDto) {}
