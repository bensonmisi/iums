import { Module } from '@nestjs/common';
import { TenderreceiptingService } from './tenderreceipting.service';
import { TenderreceiptingController } from './tenderreceipting.controller';

@Module({
  controllers: [TenderreceiptingController],
  providers: [TenderreceiptingService]
})
export class TenderreceiptingModule {}
