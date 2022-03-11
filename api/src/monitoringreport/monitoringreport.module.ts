import { Module } from '@nestjs/common';
import { MonitoringreportService } from './monitoringreport.service';
import { MonitoringreportController } from './monitoringreport.controller';

@Module({
  controllers: [MonitoringreportController],
  providers: [MonitoringreportService]
})
export class MonitoringreportModule {}
