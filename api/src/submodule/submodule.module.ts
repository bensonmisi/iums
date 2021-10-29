import { Module } from '@nestjs/common';
import { SubmoduleService } from './submodule.service';
import { SubmoduleController } from './submodule.controller';

@Module({
  controllers: [SubmoduleController],
  providers: [SubmoduleService]
})
export class SubmoduleModule {}
