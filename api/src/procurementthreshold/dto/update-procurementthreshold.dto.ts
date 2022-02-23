import { PartialType } from '@nestjs/mapped-types';
import { CreateProcurementthresholdDto } from './create-procurementthreshold.dto';

export class UpdateProcurementthresholdDto extends PartialType(CreateProcurementthresholdDto) {}
