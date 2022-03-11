import { Module } from '@nestjs/common';
import { MonthlyreturnService } from './monthlyreturn.service';
import { MonthlyreturnController } from './monthlyreturn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monthlyreturn } from './entities/monthlyreturn.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Monthlyreturn])],
  controllers: [MonthlyreturnController],
  providers: [MonthlyreturnService]
})
export class MonthlyreturnModule {}
