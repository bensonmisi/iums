import { PartialType } from '@nestjs/mapped-types';
import { CreateTenderinvoiceDto } from './create-tenderinvoice.dto';

export class UpdateTenderinvoiceDto extends PartialType(CreateTenderinvoiceDto) {}
