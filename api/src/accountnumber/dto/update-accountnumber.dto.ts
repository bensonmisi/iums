import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountnumberDto } from './create-accountnumber.dto';

export class UpdateAccountnumberDto extends PartialType(CreateAccountnumberDto) {}
