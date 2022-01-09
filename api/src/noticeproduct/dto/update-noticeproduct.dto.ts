import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticeproductDto } from './create-noticeproduct.dto';

export class UpdateNoticeproductDto extends PartialType(CreateNoticeproductDto) {}
