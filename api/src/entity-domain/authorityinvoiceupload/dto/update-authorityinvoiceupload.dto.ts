import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorityinvoiceuploadDto } from './create-authorityinvoiceupload.dto';

export class UpdateAuthorityinvoiceuploadDto extends PartialType(CreateAuthorityinvoiceuploadDto) {}
