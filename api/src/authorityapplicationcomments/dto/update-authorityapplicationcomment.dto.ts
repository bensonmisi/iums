import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorityapplicationcommentDto } from './create-authorityapplicationcomment.dto';

export class UpdateAuthorityapplicationcommentDto extends PartialType(CreateAuthorityapplicationcommentDto) {}
