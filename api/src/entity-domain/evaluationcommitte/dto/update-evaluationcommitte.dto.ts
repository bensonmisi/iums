import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationcommitteDto } from './create-evaluationcommitte.dto';

export class UpdateEvaluationcommitteDto extends PartialType(CreateEvaluationcommitteDto) {}
