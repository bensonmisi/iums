import { PartialType } from '@nestjs/mapped-types';
import { CreateRtgDto } from './create-rtg.dto';

export class UpdateRtgDto extends PartialType(CreateRtgDto) {}
