import { PartialType } from '@nestjs/mapped-types';
import { CreateProcurementClassFeeDto } from './create-procurement-class-fee.dto';

export class UpdateProcurementClassFeeDto extends PartialType(CreateProcurementClassFeeDto) {}
