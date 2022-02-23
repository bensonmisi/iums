import { PartialType } from '@nestjs/mapped-types';
import { CreateProcurementEntityUserDto } from './create-procuremententity-user.dto';


export class UpdateProcurementEntityUserDto extends PartialType(CreateProcurementEntityUserDto) {}
