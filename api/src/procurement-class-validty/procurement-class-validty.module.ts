import { Module } from '@nestjs/common';
import { ProcurementClassValidtyService } from './procurement-class-validty.service';
import { ProcurementClassValidtyController } from './procurement-class-validty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcurementClassValidty } from './entities/procurement-class-validty.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProcurementClassValidty])],
  controllers: [ProcurementClassValidtyController],
  providers: [ProcurementClassValidtyService]
})
export class ProcurementClassValidtyModule {}
