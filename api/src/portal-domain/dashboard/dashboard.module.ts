import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports:[HelperModule],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
