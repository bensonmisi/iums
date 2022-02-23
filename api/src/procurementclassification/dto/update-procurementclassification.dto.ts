import { PartialType } from '@nestjs/mapped-types';
import { CreateProcurementclassificationDto } from './create-procurementclassification.dto';

export class UpdateProcurementclassificationDto extends PartialType(CreateProcurementclassificationDto) {}
