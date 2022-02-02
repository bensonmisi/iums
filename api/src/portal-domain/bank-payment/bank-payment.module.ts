import { Module } from '@nestjs/common';
import { BankPaymentService } from './bank-payment.service';
import { BankPaymentController } from './bank-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banktransaction } from 'src/banktransaction/entities/banktransaction.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Banktransaction])],
  controllers: [BankPaymentController],
  providers: [BankPaymentService]
})
export class BankPaymentModule {}
