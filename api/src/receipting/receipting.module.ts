import { Module } from '@nestjs/common';
import { ReceiptingService } from './receipting.service';
import { ReceiptingController } from './receipting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/receipt/entities/receipt.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Receipt])],
  providers: [ReceiptingService],
  controllers: [ReceiptingController],


})
export class ReceiptingModule {}
