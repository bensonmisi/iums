import { Module } from '@nestjs/common';
import { EntitynoticecategoryService } from './entitynoticecategory.service';
import { EntitynoticecategoryController } from './entitynoticecategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticecategory } from 'src/noticecategory/entities/noticecategory.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Noticecategory])],
  controllers: [EntitynoticecategoryController],
  providers: [EntitynoticecategoryService]
})
export class EntitynoticecategoryModule {}
