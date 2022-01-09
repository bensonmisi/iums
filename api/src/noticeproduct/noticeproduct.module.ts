import { Module } from '@nestjs/common';
import { NoticeproductService } from './noticeproduct.service';
import { NoticeproductController } from './noticeproduct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticeproduct } from './entities/noticeproduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Noticeproduct])],
  controllers: [NoticeproductController],
  providers: [NoticeproductService]
})
export class NoticeproductModule {}
