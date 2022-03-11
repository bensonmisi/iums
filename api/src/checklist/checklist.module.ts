import { Module } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ChecklistController } from './checklist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checklist } from './entities/checklist.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Checklist])],
  controllers: [ChecklistController],
  providers: [ChecklistService]
})
export class ChecklistModule {}
