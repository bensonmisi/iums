import { Module } from '@nestjs/common';
import { ProcurementmanagementunitService } from './procurementmanagementunit.service';
import { ProcurementmanagementunitController } from './procurementmanagementunit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procurementmanagementunit } from './entities/procurementmanagementunit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Procurementmanagementunit])],
  controllers: [ProcurementmanagementunitController],
  providers: [ProcurementmanagementunitService]
})
export class ProcurementmanagementunitModule {}
