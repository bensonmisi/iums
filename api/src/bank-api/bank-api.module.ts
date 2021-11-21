import { Module } from '@nestjs/common';
import { BankApiService } from './bank-api.service';
import { BankApiController } from './bank-api.controller';
import { BanktransactionModule } from 'src/banktransaction/banktransaction.module';

@Module({
  imports:[BanktransactionModule],
  providers: [BankApiService],
  controllers: [BankApiController]
})
export class BankApiModule {}
