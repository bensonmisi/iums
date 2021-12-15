import { Module } from '@nestjs/common';
import { SupplierinvoiceService } from './supplierinvoice.service';
import { SupplierinvoiceController } from './supplierinvoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplierinvoice } from './entities/supplierinvoice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Supplierinvoice])],
  controllers: [SupplierinvoiceController],
  providers: [SupplierinvoiceService]
})
export class SupplierinvoiceModule {}
