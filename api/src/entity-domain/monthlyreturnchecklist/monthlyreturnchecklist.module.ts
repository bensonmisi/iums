import { Module } from '@nestjs/common';
import { MonthlyreturnchecklistService } from './monthlyreturnchecklist.service';
import { MonthlyreturnchecklistController } from './monthlyreturnchecklist.controller';

@Module({
  controllers: [MonthlyreturnchecklistController],
  providers: [MonthlyreturnchecklistService]
})
export class MonthlyreturnchecklistModule {}
