import { PartialType } from '@nestjs/mapped-types';
import { CreateBidbondrefundlistDto } from './create-bidbondrefundlist.dto';

export class UpdateBidbondrefundlistDto extends PartialType(CreateBidbondrefundlistDto) {}
