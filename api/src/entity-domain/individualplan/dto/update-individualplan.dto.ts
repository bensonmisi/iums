import { PartialType } from '@nestjs/mapped-types';
import { CreateIndividualplanDto } from './create-individualplan.dto';

export class UpdateIndividualplanDto extends PartialType(CreateIndividualplanDto) {}
