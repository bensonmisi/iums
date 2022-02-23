import { PartialType } from '@nestjs/mapped-types';
import { CreateProcurementcategoryDto } from './create-procurementcategory.dto';

export class UpdateProcurementcategoryDto extends PartialType(CreateProcurementcategoryDto) {}
