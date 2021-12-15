import { Module } from '@nestjs/common';
import { BidbondthresholdService } from './bidbondthreshold.service';
import { BidbondthresholdController } from './bidbondthreshold.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bidbondthreshold } from './entities/bidbondthreshold.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bidbondthreshold])],
  controllers: [BidbondthresholdController],
  providers: [BidbondthresholdService]
})
export class BidbondthresholdModule {}
