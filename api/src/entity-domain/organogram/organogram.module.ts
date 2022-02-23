import { Module } from '@nestjs/common';
import { OrganogramService } from './organogram.service';
import { OrganogramController } from './organogram.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organogram } from './entities/organogram.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Organogram])],
  controllers: [OrganogramController],
  providers: [OrganogramService]
})
export class OrganogramModule {}
