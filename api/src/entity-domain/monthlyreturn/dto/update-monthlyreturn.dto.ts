import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyreturnDto } from './create-monthlyreturn.dto';

export class UpdateMonthlyreturnDto extends PartialType(CreateMonthlyreturnDto) {}
