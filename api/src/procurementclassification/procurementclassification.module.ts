import { Module } from '@nestjs/common';
import { ProcurementclassificationService } from './procurementclassification.service';
import { ProcurementclassificationController } from './procurementclassification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procurementclassification } from './entities/procurementclassification.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Procurementclassification])],
  controllers: [ProcurementclassificationController],
  providers: [ProcurementclassificationService]
})
export class ProcurementclassificationModule {}
