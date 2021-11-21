import { PartialType } from '@nestjs/mapped-types';
import { CreateManualtransactionDto } from './create-manualtransaction.dto';

export class UpdateManualtransactionDto extends PartialType(CreateManualtransactionDto) {}
