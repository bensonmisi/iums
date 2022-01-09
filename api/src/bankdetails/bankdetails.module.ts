import { Module } from '@nestjs/common';
import { BankdetailsService } from './bankdetails.service';
import { BankdetailsController } from './bankdetails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bankdetail } from './entities/bankdetail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bankdetail])],
  controllers: [BankdetailsController],
  providers: [BankdetailsService]
})
export class BankdetailsModule {}
