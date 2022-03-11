import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyreturndatumDto } from './create-monthlyreturndatum.dto';

export class UpdateMonthlyreturndatumDto extends PartialType(CreateMonthlyreturndatumDto) {}
