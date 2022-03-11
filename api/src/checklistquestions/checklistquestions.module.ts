import { Module } from '@nestjs/common';
import { ChecklistquestionsService } from './checklistquestions.service';
import { ChecklistquestionsController } from './checklistquestions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checklistquestion } from './entities/checklistquestion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Checklistquestion])],
  controllers: [ChecklistquestionsController],
  providers: [ChecklistquestionsService]
})
export class ChecklistquestionsModule {}
