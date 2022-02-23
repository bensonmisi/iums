import { Module } from '@nestjs/common';
import { ProcurementClassFeeService } from './procurement-class-fee.service';
import { ProcurementClassFeeController } from './procurement-class-fee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcurementClassFee } from './entities/procurement-class-fee.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProcurementClassFee])],
  controllers: [ProcurementClassFeeController],
  providers: [ProcurementClassFeeService]
})
export class ProcurementClassFeeModule {}
