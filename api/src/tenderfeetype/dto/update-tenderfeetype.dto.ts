import { PartialType } from '@nestjs/mapped-types';
import { CreateTenderfeetypeDto } from './create-tenderfeetype.dto';

export class UpdateTenderfeetypeDto extends PartialType(CreateTenderfeetypeDto) {}
