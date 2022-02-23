import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorityinvoiceDto } from './create-authorityinvoice.dto';

export class UpdateAuthorityinvoiceDto extends PartialType(CreateAuthorityinvoiceDto) {}
