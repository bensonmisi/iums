import { PartialType } from '@nestjs/mapped-types';
import { CreateImporttransactionDto } from './create-importtransaction.dto';

export class UpdateImporttransactionDto extends PartialType(CreateImporttransactionDto) {}
