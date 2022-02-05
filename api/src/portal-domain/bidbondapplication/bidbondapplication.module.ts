import { Module } from '@nestjs/common';
import { BidbondapplicationService } from './bidbondapplication.service';
import { BidbondapplicationController } from './bidbondapplication.controller';

@Module({
  controllers: [BidbondapplicationController],
  providers: [BidbondapplicationService]
})
export class BidbondapplicationModule {}
