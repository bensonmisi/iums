import { Module } from '@nestjs/common';
import { EntitynoticeService } from './entitynotice.service';
import { EntitynoticeController } from './entitynotice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from 'src/notice/entities/notice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Notice])],
  controllers: [EntitynoticeController],
  providers: [EntitynoticeService]
})
export class EntitynoticeModule {}
