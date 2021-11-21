import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountprofileDto } from './create-accountprofile.dto';

export class UpdateAccountprofileDto extends PartialType(CreateAccountprofileDto) {}
