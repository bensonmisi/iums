import { Injectable } from '@nestjs/common';
import { CreateSystemModuleDto } from './dto/create-system-module.dto';
import { UpdateSystemModuleDto } from './dto/update-system-module.dto';

@Injectable()
export class SystemModulesService {
  create(createSystemModuleDto: CreateSystemModuleDto) {
    return 'This action adds a new systemModule';
  }

  findAll() {
    return `This action returns all systemModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} systemModule`;
  }

  update(id: number, updateSystemModuleDto: UpdateSystemModuleDto) {
    return `This action updates a #${id} systemModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} systemModule`;
  }
}
