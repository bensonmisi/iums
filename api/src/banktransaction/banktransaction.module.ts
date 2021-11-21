import { Module } from '@nestjs/common';
import { BanktransactionService } from './banktransaction.service';
import { BanktransactionController } from './banktransaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banktransaction } from './entities/banktransaction.entity';
import { BankModule } from 'src/bank/bank.module';
import { AccountsModule } from 'src/accounts/accounts.module';
import { SuspenseModule } from 'src/suspense/suspense.module';

@Module({
  imports:[TypeOrmModule.forFeature([Banktransaction]),BankModule,AccountsModule,SuspenseModule],
  controllers: [BanktransactionController],
  providers: [BanktransactionService],
  exports:[BanktransactionService]
})
export class BanktransactionModule {}
