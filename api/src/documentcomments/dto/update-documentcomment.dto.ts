import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentcommentDto } from './create-documentcomment.dto';

export class UpdateDocumentcommentDto extends PartialType(CreateDocumentcommentDto) {}
