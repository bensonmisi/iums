import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticeawardDto } from './create-noticeaward.dto';

export class UpdateNoticeawardDto extends PartialType(CreateNoticeawardDto) {}
