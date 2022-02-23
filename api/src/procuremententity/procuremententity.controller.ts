import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProcuremententityService } from './procuremententity.service';
import { CreateProcuremententityDto } from './dto/create-procuremententity.dto';
import { UpdateProcuremententityDto } from './dto/update-procuremententity.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/procuremententity')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class ProcuremententityController {
  constructor(private readonly procuremententityService: ProcuremententityService) {}

  @Post()
  @HasPermission('CREATE_ENTITY')
  async create(@Body() createProcuremententityDto: CreateProcuremententityDto,@Request() req) {
    const user = req.user
    createProcuremententityDto.creator = user.userId
    return await this.procuremententityService.create(createProcuremententityDto);
  }

  @Get()
  @HasPermission('GET_ENTITIES')
 async findAll() {
    return await this.procuremententityService.findAll();
  }

  

  @Patch(':id')
  @HasPermission('UPDATE_ENTITY')
  async update(@Param('id') id: string, @Body() updateProcuremententityDto: UpdateProcuremententityDto,@Request() req) {
    const user = req.user
    return this.procuremententityService.update(+id, updateProcuremententityDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_ENTITY')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.procuremententityService.remove(+id,user.userId);
  }
}
