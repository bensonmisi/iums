import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnualplanDto } from './create-annualplan.dto';

export class UpdateAnnualplanDto extends PartialType(CreateAnnualplanDto) {}
