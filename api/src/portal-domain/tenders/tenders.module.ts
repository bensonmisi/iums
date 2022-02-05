import { Module } from '@nestjs/common';
import { TendersService } from './tenders.service';
import { TendersController } from './tenders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Notice])],
  controllers: [TendersController],
  providers: [TendersService]
})
export class TendersModule {}
