import { Module } from '@nestjs/common';
import { ProcurementclassService } from './procurementclass.service';
import { ProcurementclassController } from './procurementclass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procurementclass } from './entities/procurementclass.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Procurementclass])],
  controllers: [ProcurementclassController],
  providers: [ProcurementclassService]
})
export class ProcurementclassModule {}
