import { PartialType } from '@nestjs/mapped-types';
import { CreateChecklistquestionDto } from './create-checklistquestion.dto';

export class UpdateChecklistquestionDto extends PartialType(CreateChecklistquestionDto) {}
