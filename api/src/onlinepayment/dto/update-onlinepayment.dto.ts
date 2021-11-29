import { PartialType } from '@nestjs/mapped-types';
import { CreateOnlinepaymentDto } from './create-onlinepayment.dto';

export class UpdateOnlinepaymentDto extends PartialType(CreateOnlinepaymentDto) {}
