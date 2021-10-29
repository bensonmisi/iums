import { PartialType } from '@nestjs/mapped-types';
import { CreateSystemModuleDto } from './create-system-module.dto';

export class UpdateSystemModuleDto extends PartialType(CreateSystemModuleDto) {}
