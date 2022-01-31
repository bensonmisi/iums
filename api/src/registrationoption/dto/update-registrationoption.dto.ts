import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationoptionDto } from './create-registrationoption.dto';

export class UpdateRegistrationoptionDto extends PartialType(CreateRegistrationoptionDto) {}
