import { Module } from '@nestjs/common';
import { NoticeawardsService } from './noticeawards.service';
import { NoticeawardsController } from './noticeawards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticeaward } from './entities/noticeaward.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[TypeOrmModule.forFeature([Noticeaward]),MailModule,BullModule],
  controllers: [NoticeawardsController],
  providers: [NoticeawardsService]
})
export class NoticeawardsModule {}
