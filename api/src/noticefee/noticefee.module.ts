import { Module } from '@nestjs/common';
import { NoticefeeService } from './noticefee.service';
import { NoticefeeController } from './noticefee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticefee } from './entities/noticefee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Noticefee])],
  controllers: [NoticefeeController],
  providers: [NoticefeeService]
})
export class NoticefeeModule {}
