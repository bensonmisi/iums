import { Module } from '@nestjs/common';
import { SupplierreceiptingService } from './supplierreceipting.service';
import { SupplierreceiptingController } from './supplierreceipting.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[MailModule],
  providers: [SupplierreceiptingService],
  controllers: [SupplierreceiptingController]
})
export class SupplierreceiptingModule {}
