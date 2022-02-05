import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Noticefee } from 'src/noticefee/entities/noticefee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Notice,Noticefee])],
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule {}
