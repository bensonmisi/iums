import { PartialType } from '@nestjs/mapped-types';
import { CreateTenderapplicationDto } from './create-tenderapplication.dto';

export class UpdateTenderapplicationDto extends PartialType(CreateTenderapplicationDto) {}
