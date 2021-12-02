import { Module } from '@nestjs/common';
import { TenderfeetypeService } from './tenderfeetype.service';
import { TenderfeetypeController } from './tenderfeetype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenderfeetype } from './entities/tenderfeetype.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Tenderfeetype])],
  controllers: [TenderfeetypeController],
  providers: [TenderfeetypeService]
})
export class TenderfeetypeModule {}
