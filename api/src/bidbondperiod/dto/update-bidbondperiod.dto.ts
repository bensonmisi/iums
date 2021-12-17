import { PartialType } from '@nestjs/mapped-types';
import { CreateBidbondperiodDto } from './create-bidbondperiod.dto';

export class UpdateBidbondperiodDto extends PartialType(CreateBidbondperiodDto) {}
