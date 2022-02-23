import { Injectable } from '@nestjs/common';
import { CreateEntityUserDto } from './dto/create-entity-user.dto';
import { UpdateEntityUserDto } from './dto/update-entity-user.dto';

@Injectable()
export class EntityUserService {
  create(createEntityUserDto: CreateEntityUserDto) {
    return 'This action adds a new entityUser';
  }

  findAll() {
    return `This action returns all entityUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entityUser`;
  }

  update(id: number, updateEntityUserDto: UpdateEntityUserDto) {
    return `This action updates a #${id} entityUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} entityUser`;
  }
}
