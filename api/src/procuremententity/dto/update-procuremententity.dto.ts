import { PartialType } from '@nestjs/mapped-types';
import { CreateProcuremententityDto } from './create-procuremententity.dto';

export class UpdateProcuremententityDto extends PartialType(CreateProcuremententityDto) {}
