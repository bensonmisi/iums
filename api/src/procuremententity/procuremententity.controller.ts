import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
  async create(@Body() createProcuremententityDto: CreateProcuremententityDto) {
    return await this.procuremententityService.create(createProcuremententityDto);
  }

  @Get()
  @HasPermission('GET_ENTITIES')
 async findAll() {
    return await this.procuremententityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procuremententityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcuremententityDto: UpdateProcuremententityDto) {
    return this.procuremententityService.update(+id, updateProcuremententityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procuremententityService.remove(+id);
  }
}
