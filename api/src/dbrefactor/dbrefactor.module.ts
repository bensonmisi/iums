import { Module } from '@nestjs/common';
import { DbrefactorService } from './dbrefactor.service';
import { DbrefactorController } from './dbrefactor.controller';

@Module({
  providers: [DbrefactorService],
  controllers: [DbrefactorController]
})
export class DbrefactorModule {}
