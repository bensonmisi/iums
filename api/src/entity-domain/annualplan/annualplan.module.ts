import { Module } from '@nestjs/common';
import { AnnualplanService } from './annualplan.service';
import { AnnualplanController } from './annualplan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annualplan } from './entities/annualplan.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Annualplan])],
  controllers: [AnnualplanController],
  providers: [AnnualplanService]
})
export class AnnualplanModule {}
