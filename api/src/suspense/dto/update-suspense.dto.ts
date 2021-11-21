import { PartialType } from '@nestjs/mapped-types';
import { CreateSuspenseDto } from './create-suspense.dto';

export class UpdateSuspenseDto extends PartialType(CreateSuspenseDto) {}
