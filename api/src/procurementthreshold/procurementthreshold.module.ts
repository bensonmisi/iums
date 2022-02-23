import { Module } from '@nestjs/common';
import { ProcurementthresholdService } from './procurementthreshold.service';
import { ProcurementthresholdController } from './procurementthreshold.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procurementthreshold } from './entities/procurementthreshold.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Procurementthreshold])],
  controllers: [ProcurementthresholdController],
  providers: [ProcurementthresholdService]
})
export class ProcurementthresholdModule {}
