import { PartialType } from '@nestjs/mapped-types';
import { CreateProcurementClassValidtyDto } from './create-procurement-class-validty.dto';

export class UpdateProcurementClassValidtyDto extends PartialType(CreateProcurementClassValidtyDto) {}
