import { PartialType } from '@nestjs/mapped-types';
import { CreateTendereditrequestDto } from './create-tendereditrequest.dto';

export class UpdateTendereditrequestDto extends PartialType(CreateTendereditrequestDto) {}
