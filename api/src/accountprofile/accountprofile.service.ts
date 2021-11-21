import { Injectable } from '@nestjs/common';
import { CreateAccountprofileDto } from './dto/create-accountprofile.dto';
import { UpdateAccountprofileDto } from './dto/update-accountprofile.dto';

@Injectable()
export class AccountprofileService {
  create(createAccountprofileDto: CreateAccountprofileDto) {
    return 'This action adds a new accountprofile';
  }

  findAll() {
    return `This action returns all accountprofile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountprofile`;
  }

  update(id: number, updateAccountprofileDto: UpdateAccountprofileDto) {
    return `This action updates a #${id} accountprofile`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountprofile`;
  }
}
