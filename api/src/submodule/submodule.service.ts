import { Injectable } from '@nestjs/common';
import { CreateSubmoduleDto } from './dto/create-submodule.dto';
import { UpdateSubmoduleDto } from './dto/update-submodule.dto';

@Injectable()
export class SubmoduleService {
  create(createSubmoduleDto: CreateSubmoduleDto) {
    return 'This action adds a new submodule';
  }

  findAll() {
    return `This action returns all submodule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submodule`;
  }

  update(id: number, updateSubmoduleDto: UpdateSubmoduleDto) {
    return `This action updates a #${id} submodule`;
  }

  remove(id: number) {
    return `This action removes a #${id} submodule`;
  }
}
