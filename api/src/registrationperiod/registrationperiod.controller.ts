import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegistrationperiodService } from './registrationperiod.service';
import { CreateRegistrationperiodDto } from './dto/create-registrationperiod.dto';
import { UpdateRegistrationperiodDto } from './dto/update-registrationperiod.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('api/admin/registrationperiod')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class RegistrationperiodController {
  constructor(private readonly registrationperiodService: RegistrationperiodService) {}

  @Post()
  @HasPermission('CREATE_PERIOD')
 async create(@Body() createRegistrationperiodDto: CreateRegistrationperiodDto) {
    return await this.registrationperiodService.create(createRegistrationperiodDto);
  }

  @Get()
  @HasPermission('GET_PERIODS')
 async findAll() {
    return  await this.registrationperiodService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_PERIOD')
  async findOne(@Param('id') id: string) {
    return await this.registrationperiodService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_PERIOD')
  async update(@Param('id') id: string, @Body() updateRegistrationperiodDto: UpdateRegistrationperiodDto) {
    return await this.registrationperiodService.update(+id, updateRegistrationperiodDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_PERIOD')
  remove(@Param('id') id: string) {
    return this.registrationperiodService.remove(+id);
  }
}
