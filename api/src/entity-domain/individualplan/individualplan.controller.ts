import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { IndividualplanService } from './individualplan.service';
import { CreateIndividualplanDto } from './dto/create-individualplan.dto';
import { UpdateIndividualplanDto } from './dto/update-individualplan.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('entity-domain/individualplan')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class IndividualplanController {
  constructor(private readonly individualplanService: IndividualplanService) {}

  @Post()
  @HasPermission('CREATE_INDIVIDUALPLAN')
 async create(@Body() createIndividualplanDto: CreateIndividualplanDto,@Request() req) {
    const user = req.user
    return await this.individualplanService.create(createIndividualplanDto,user.userId);
  }

  @Get(':id')
  @HasPermission('GET_INDIVIDUALPLANS')
  async findAll(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.individualplanService.findAll(+id,user.userId);
  }

  @Patch(':id')
  @HasPermission('UPDATE_INDIVIDUALPLAN')
  async update(@Param('id') id: string, @Body() updateIndividualplanDto: UpdateIndividualplanDto,@Request() req) {
    const user = req.user
    return await this.individualplanService.update(+id, updateIndividualplanDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_INDIVIDUALPLAN')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.individualplanService.remove(+id,user.userId);
  }
}
