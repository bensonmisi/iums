import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationperiodDto } from './create-registrationperiod.dto';

export class UpdateRegistrationperiodDto extends PartialType(CreateRegistrationperiodDto) {}
