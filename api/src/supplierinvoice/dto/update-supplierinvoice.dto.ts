import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierinvoiceDto } from './create-supplierinvoice.dto';

export class UpdateSupplierinvoiceDto extends PartialType(CreateSupplierinvoiceDto) {}
