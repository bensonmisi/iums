import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Tenderapplication } from 'src/tenderapplication/entities/tenderapplication.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Supplier,Tenderapplication])],
  controllers: [VerificationController],
  providers: [VerificationService]
})
export class VerificationModule {}
