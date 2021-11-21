import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { RegistrationfeeService } from './registrationfee.service';
import { CreateRegistrationfeeDto } from './dto/create-registrationfee.dto';
import { UpdateRegistrationfeeDto } from './dto/update-registrationfee.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/registrationfee')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class RegistrationfeeController {
  constructor(private readonly registrationfeeService: RegistrationfeeService) {}

  
  @Post()
  @HasPermission('CREATE_REGISTRATIONFEE')
  create(@Body() createRegistrationfeeDto: CreateRegistrationfeeDto,@Request() req) {
    const user = req.user
    return this.registrationfeeService.create(createRegistrationfeeDto,user.userId);
  }

  @Get()
  @HasPermission('GET_REGISTRATIONFEES')
  findAll() {
    return this.registrationfeeService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_REGISTRATIONFEE')
  findOne(@Param('id') id: string) {
    return this.registrationfeeService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_REGISTRATIONFEE')
  update(@Param('id') id: string, @Body() updateRegistrationfeeDto: UpdateRegistrationfeeDto) {
    return this.registrationfeeService.update(+id, updateRegistrationfeeDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_REGISTRATIONFEE')
  remove(@Param('id') id: string) {
    return this.registrationfeeService.remove(+id);
  }
}
