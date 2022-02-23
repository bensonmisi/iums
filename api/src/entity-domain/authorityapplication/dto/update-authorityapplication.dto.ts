import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorityapplicationDto } from './create-authorityapplication.dto';

export class UpdateAuthorityapplicationDto extends PartialType(CreateAuthorityapplicationDto) {}
