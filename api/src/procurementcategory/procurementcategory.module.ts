import { Module } from '@nestjs/common';
import { ProcurementcategoryService } from './procurementcategory.service';
import { ProcurementcategoryController } from './procurementcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procurementcategory } from './entities/procurementcategory.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Procurementcategory])],
  controllers: [ProcurementcategoryController],
  providers: [ProcurementcategoryService]
})
export class ProcurementcategoryModule {}
