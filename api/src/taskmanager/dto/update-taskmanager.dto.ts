import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskmanagerDto } from './create-taskmanager.dto';

export class UpdateTaskmanagerDto extends PartialType(CreateTaskmanagerDto) {}
