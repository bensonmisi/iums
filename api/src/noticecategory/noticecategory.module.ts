import { Module } from '@nestjs/common';
import { NoticecategoryService } from './noticecategory.service';
import { NoticecategoryController } from './noticecategory.controller';

@Module({
  controllers: [NoticecategoryController],
  providers: [NoticecategoryService]
})
export class NoticecategoryModule {}
