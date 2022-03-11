import { Module } from '@nestjs/common';
import { BidbondrefundlistService } from './bidbondrefundlist.service';
import { BidbonrefundlistController } from './bidbondrefundlist.controller';

@Module({
  controllers: [BidbonrefundlistController],
  providers: [BidbondrefundlistService]
})
export class BidbonrefundlistModule {}
