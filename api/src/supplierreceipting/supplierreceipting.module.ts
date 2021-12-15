import { Module } from '@nestjs/common';
import { SupplierreceiptingService } from './supplierreceipting.service';
import { SupplierreceiptingController } from './supplierreceipting.controller';

@Module({
  providers: [SupplierreceiptingService],
  controllers: [SupplierreceiptingController]
})
export class SupplierreceiptingModule {}
