import { Module } from '@nestjs/common';
import { SupplierreportService } from './supplierreport.service';
import { SupplierreportController } from './supplierreport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Supplierinvoice,Supplier])],
  providers: [SupplierreportService],
  controllers: [SupplierreportController]
})
export class SupplierreportModule {}
