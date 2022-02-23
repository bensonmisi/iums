import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityUserDto } from './create-entity-user.dto';

export class UpdateEntityUserDto extends PartialType(CreateEntityUserDto) {}
