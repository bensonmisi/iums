import { Module } from '@nestjs/common';
import { BidbondperiodService } from './bidbondperiod.service';
import { BidbondperiodController } from './bidbondperiod.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bidbondperiod } from './entities/bidbondperiod.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bidbondperiod])],
  controllers: [BidbondperiodController],
  providers: [BidbondperiodService]
})
export class BidbondperiodModule {}
