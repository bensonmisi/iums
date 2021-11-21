import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountdocumentDto } from './create-accountdocument.dto';

export class UpdateAccountdocumentDto extends PartialType(CreateAccountdocumentDto) {}
