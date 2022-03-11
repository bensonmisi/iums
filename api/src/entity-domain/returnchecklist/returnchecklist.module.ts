import { Module } from '@nestjs/common';
import { ReturnchecklistService } from './returnchecklist.service';
import { ReturnchecklistController } from './returnchecklist.controller';

@Module({
  controllers: [ReturnchecklistController],
  providers: [ReturnchecklistService]
})
export class ReturnchecklistModule {}
