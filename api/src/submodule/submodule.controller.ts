import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmoduleService } from './submodule.service';
import { CreateSubmoduleDto } from './dto/create-submodule.dto';
import { UpdateSubmoduleDto } from './dto/update-submodule.dto';
import { Submodule } from './entities/submodule.entity';

@Controller('api/admin/submodules')
export class SubmoduleController {
  constructor(private readonly submoduleService: SubmoduleService) {}

  @Post()
 async create(@Body() createSubmoduleDto: CreateSubmoduleDto):Promise<any> {
    return await this.submoduleService.create(createSubmoduleDto);
  }

  @Get()
  async findAll():Promise<Submodule[]> {
    return await this.submoduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Submodule> {
    return await this.submoduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmoduleDto: UpdateSubmoduleDto):Promise<any> {
    return this.submoduleService.update(+id, updateSubmoduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) :Promise<any>{
    return this.submoduleService.remove(+id);
  }
}
