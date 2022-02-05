import { Module } from '@nestjs/common';
import { NoticeinvoicingService } from './noticeinvoicing.service';
import { NoticeinvoicingController } from './noticeinvoicing.controller';

@Module({
  controllers: [NoticeinvoicingController],
  providers: [NoticeinvoicingService]
})
export class NoticeinvoicingModule {}
