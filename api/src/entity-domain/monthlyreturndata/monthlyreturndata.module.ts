import { Module } from '@nestjs/common';
import { MonthlyreturndataService } from './monthlyreturndata.service';
import { MonthlyreturndataController } from './monthlyreturndata.controller';

@Module({
  controllers: [MonthlyreturndataController],
  providers: [MonthlyreturndataService]
})
export class MonthlyreturndataModule {}
