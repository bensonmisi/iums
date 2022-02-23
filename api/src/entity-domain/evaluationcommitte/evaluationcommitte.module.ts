import { Module } from '@nestjs/common';
import { EvaluationcommitteService } from './evaluationcommitte.service';
import { EvaluationcommitteController } from './evaluationcommitte.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluationcommitte } from './entities/evaluationcommitte.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Evaluationcommitte])],
  controllers: [EvaluationcommitteController],
  providers: [EvaluationcommitteService]
})
export class EvaluationcommitteModule {}
