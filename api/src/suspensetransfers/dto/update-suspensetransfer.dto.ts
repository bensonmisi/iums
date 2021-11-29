import { PartialType } from '@nestjs/mapped-types';
import { CreateSuspensetransferDto } from './create-suspensetransfer.dto';

export class UpdateSuspensetransferDto extends PartialType(CreateSuspensetransferDto) {}
