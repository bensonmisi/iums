import { Module } from '@nestjs/common';
import { EntitynoticefeeService } from './entitynoticefee.service';
import { EntitynoticefeeController } from './entitynoticefee.controller';

@Module({
  controllers: [EntitynoticefeeController],
  providers: [EntitynoticefeeService]
})
export class EntitynoticefeeModule {}
