import { Module } from '@nestjs/common';
import { TendereditrequestService } from './tendereditrequest.service';
import { TendereditrequestController } from './tendereditrequest.controller';

@Module({
  controllers: [TendereditrequestController],
  providers: [TendereditrequestService]
})
export class TendereditrequestModule {}
