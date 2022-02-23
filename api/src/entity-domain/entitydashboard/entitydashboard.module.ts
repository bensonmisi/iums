import { Module } from '@nestjs/common';
import { EntitydashboardService } from './entitydashboard.service';
import { EntitydashboardController } from './entitydashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EntitydashboardController],
  providers: [EntitydashboardService]
})
export class EntitydashboardModule {}
