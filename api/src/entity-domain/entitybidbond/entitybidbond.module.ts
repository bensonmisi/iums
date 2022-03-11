import { Module } from '@nestjs/common';
import { EntitybidbondService } from './entitybidbond.service';
import { EntitybidbondController } from './entitybidbond.controller';

@Module({
  controllers: [EntitybidbondController],
  providers: [EntitybidbondService]
})
export class EntitybidbondModule {}
