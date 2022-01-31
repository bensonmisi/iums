import { Module } from '@nestjs/common';
import { SupplierinvoicingService } from './supplierinvoicing.service';
import { SupplierinvoicingController } from './supplierinvoicing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplierinvoice } from 'src/supplierinvoice/entities/supplierinvoice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Supplierinvoice])],
  providers: [SupplierinvoicingService],
  controllers: [SupplierinvoicingController]
})
export class SupplierinvoicingModule {}
