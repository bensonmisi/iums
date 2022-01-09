import { Module } from '@nestjs/common';
import { NoticefeeService } from './noticefee.service';
import { NoticefeeController } from './noticefee.controller';

@Module({
  controllers: [NoticefeeController],
  providers: [NoticefeeService]
})
export class NoticefeeModule {}
