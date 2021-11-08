import { PartialType } from '@nestjs/mapped-types';
import { CreateSuppliertypeDto } from './create-suppliertype.dto';

export class UpdateSuppliertypeDto extends PartialType(CreateSuppliertypeDto) {}
