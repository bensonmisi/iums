import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptController } from './receipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Receipt])],
  controllers: [ReceiptController],
  providers: [ReceiptService]
})
export class ReceiptModule {}
