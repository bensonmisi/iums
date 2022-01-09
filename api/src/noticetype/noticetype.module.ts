import { Module } from '@nestjs/common';
import { NoticetypeService } from './noticetype.service';
import { NoticetypeController } from './noticetype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticetype } from './entities/noticetype.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Noticetype])],
  controllers: [NoticetypeController],
  providers: [NoticetypeService]
})
export class NoticetypeModule {}
