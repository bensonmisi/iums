import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticeapplicationDto } from './create-noticeapplication.dto';

export class UpdateNoticeapplicationDto extends PartialType(CreateNoticeapplicationDto) {}
