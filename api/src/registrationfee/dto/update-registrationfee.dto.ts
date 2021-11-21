import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationfeeDto } from './create-registrationfee.dto';

export class UpdateRegistrationfeeDto extends PartialType(CreateRegistrationfeeDto) {}
