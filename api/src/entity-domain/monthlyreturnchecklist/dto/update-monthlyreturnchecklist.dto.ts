import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyreturnchecklistDto } from './create-monthlyreturnchecklist.dto';

export class UpdateMonthlyreturnchecklistDto extends PartialType(CreateMonthlyreturnchecklistDto) {}
