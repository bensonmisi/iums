import { Module } from '@nestjs/common';
import { EntityUserService } from './entity-user.service';
import { EntityUserController } from './entity-user.controller';

@Module({
  controllers: [EntityUserController],
  providers: [EntityUserService]
})
export class EntityUserModule {}
