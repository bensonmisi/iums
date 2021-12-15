import { PartialType } from '@nestjs/mapped-types';
import { CreateBidbondthresholdDto } from './create-bidbondthreshold.dto';

export class UpdateBidbondthresholdDto extends PartialType(CreateBidbondthresholdDto) {}
