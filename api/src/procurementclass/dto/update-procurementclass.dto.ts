import { PartialType } from '@nestjs/mapped-types';
import { CreateProcurementclassDto } from './create-procurementclass.dto';

export class UpdateProcurementclassDto extends PartialType(CreateProcurementclassDto) {}
