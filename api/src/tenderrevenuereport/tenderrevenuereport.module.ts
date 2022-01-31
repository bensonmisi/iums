import { Module } from '@nestjs/common';
import { TenderrevenuereportService } from './tenderrevenuereport.service';
import { TenderrevenuereportController } from './tenderrevenuereport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenderinvoice } from 'src/tenderinvoice/entities/tenderinvoice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tenderinvoice])],
  providers: [TenderrevenuereportService],
  controllers: [TenderrevenuereportController]
})
export class TenderrevenuereportModule {}
