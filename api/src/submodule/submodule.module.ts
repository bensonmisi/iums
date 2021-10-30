import { Module } from '@nestjs/common';
import { SubmoduleService } from './submodule.service';
import { SubmoduleController } from './submodule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submodule } from './entities/submodule.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Submodule])],
  controllers: [SubmoduleController],
  providers: [SubmoduleService]
})
export class SubmoduleModule {}
