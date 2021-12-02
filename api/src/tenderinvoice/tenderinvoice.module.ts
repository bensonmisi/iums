import { Module } from '@nestjs/common';
import { TenderinvoiceService } from './tenderinvoice.service';
import { TenderinvoiceController } from './tenderinvoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenderinvoice } from './entities/tenderinvoice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tenderinvoice])],
  controllers: [TenderinvoiceController],
  providers: [TenderinvoiceService]
})
export class TenderinvoiceModule {}
