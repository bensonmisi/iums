import { Module } from '@nestjs/common';
import { TenderapplicationService } from './tenderapplication.service';
import { TenderapplicationController } from './tenderapplication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenderapplication } from './entities/tenderapplication.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tenderapplication])],
  controllers: [TenderapplicationController],
  providers: [TenderapplicationService]
})
export class TenderapplicationModule {}
