import { PartialType } from '@nestjs/mapped-types';
import { CreateContactfeethresholdDto } from './create-contactfeethreshold.dto';

export class UpdateContactfeethresholdDto extends PartialType(CreateContactfeethresholdDto) {}
