import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadplanDto } from './create-uploadplan.dto';

export class UpdateUploadplanDto extends PartialType(CreateUploadplanDto) {}
