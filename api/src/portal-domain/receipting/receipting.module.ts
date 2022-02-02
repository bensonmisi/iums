import { Module } from '@nestjs/common';
import { ReceiptingService } from './receipting.service';
import { ReceiptingController } from './receipting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([Supplierinvoice,Receipt]),MailModule],
  providers: [ReceiptingService],
  controllers: [ReceiptingController]
})
export class ReceiptingModule {}
