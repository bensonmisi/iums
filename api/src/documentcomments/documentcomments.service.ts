import { Injectable } from '@nestjs/common';
import { CreateDocumentcommentDto } from './dto/create-documentcomment.dto';
import { UpdateDocumentcommentDto } from './dto/update-documentcomment.dto';

@Injectable()
export class DocumentcommentsService {
  create(createDocumentcommentDto: CreateDocumentcommentDto) {
    return 'This action adds a new documentcomment';
  }

  findAll() {
    return `This action returns all documentcomments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentcomment`;
  }

  update(id: number, updateDocumentcommentDto: UpdateDocumentcommentDto) {
    return `This action updates a #${id} documentcomment`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentcomment`;
  }
}
