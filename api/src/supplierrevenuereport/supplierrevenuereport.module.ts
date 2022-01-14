import { Module } from '@nestjs/common';
import { SupplierrevenuereportService } from './supplierrevenuereport.service';
import { SupplierrevenuereportController } from './supplierrevenuereport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Supplierinvoice])],
  providers: [SupplierrevenuereportService],
  controllers: [SupplierrevenuereportController]
})
export class SupplierrevenuereportModule {}
