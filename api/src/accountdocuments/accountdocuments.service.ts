import { Injectable } from '@nestjs/common';
import { CreateAccountdocumentDto } from './dto/create-accountdocument.dto';
import { UpdateAccountdocumentDto } from './dto/update-accountdocument.dto';

@Injectable()
export class AccountdocumentsService {
  create(createAccountdocumentDto: CreateAccountdocumentDto) {
    return 'This action adds a new accountdocument';
  }

  findAll() {
    return `This action returns all accountdocuments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountdocument`;
  }

  update(id: number, updateAccountdocumentDto: UpdateAccountdocumentDto) {
    return `This action updates a #${id} accountdocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountdocument`;
  }
}
