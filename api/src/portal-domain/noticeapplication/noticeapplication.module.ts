import { Module } from '@nestjs/common';
import { NoticeapplicationService } from './noticeapplication.service';
import { NoticeapplicationController } from './noticeapplication.controller';

@Module({
  controllers: [NoticeapplicationController],
  providers: [NoticeapplicationService]
})
export class NoticeapplicationModule {}
