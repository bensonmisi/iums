import { Module } from '@nestjs/common';
import { RtgsService } from './rtgs.service';
import { RtgsController } from './rtgs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rtg } from './entities/rtg.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Rtg])],
  controllers: [RtgsController],
  providers: [RtgsService]
})
export class RtgsModule {}
