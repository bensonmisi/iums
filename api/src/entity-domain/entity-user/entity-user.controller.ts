import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntityUserService } from './entity-user.service';
import { CreateEntityUserDto } from './dto/create-entity-user.dto';
import { UpdateEntityUserDto } from './dto/update-entity-user.dto';

@Controller('entity-user')
export class EntityUserController {
  constructor(private readonly entityUserService: EntityUserService) {}

  @Post()
  create(@Body() createEntityUserDto: CreateEntityUserDto) {
    return this.entityUserService.create(createEntityUserDto);
  }

  @Get()
  findAll() {
    return this.entityUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityUserDto: UpdateEntityUserDto) {
    return this.entityUserService.update(+id, updateEntityUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityUserService.remove(+id);
  }
}
