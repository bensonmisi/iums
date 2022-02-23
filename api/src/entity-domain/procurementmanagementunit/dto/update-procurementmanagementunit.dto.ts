import { PartialType } from '@nestjs/mapped-types';
import { CreateProcurementmanagementunitDto } from './create-procurementmanagementunit.dto';

export class UpdateProcurementmanagementunitDto extends PartialType(CreateProcurementmanagementunitDto) {}
