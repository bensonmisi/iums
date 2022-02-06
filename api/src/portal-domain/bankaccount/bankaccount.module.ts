import { Module } from '@nestjs/common';
import { BankaccountService } from './bankaccount.service';
import { BankaccountController } from './bankaccount.controller';

@Module({
  controllers: [BankaccountController],
  providers: [BankaccountService]
})
export class BankaccountModule {}
