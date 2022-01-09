import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { ContactfeethresholdService } from './contactfeethreshold.service';
import { CreateContactfeethresholdDto } from './dto/create-contactfeethreshold.dto';
import { UpdateContactfeethresholdDto } from './dto/update-contactfeethreshold.dto';

@Controller('admin/contactfeethreshold')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class ContactfeethresholdController {
  constructor(private readonly contactfeethresholdService: ContactfeethresholdService) {}

  @Post()
  @HasPermission('CREATE_CONTRACTFEETHRESHOLD')
 async create(@Body() createContactfeethresholdDto: CreateContactfeethresholdDto) {
    return await this.contactfeethresholdService.create(createContactfeethresholdDto);
  }

  @Get()
  @HasPermission('GET_CONTRACTFEETHRESHOLDS') 
  async findAll() {
    return await this.contactfeethresholdService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_CONTRACTFEETHRESHOLD') 
  async findOne(@Param('id') id: string) {
    return await this.contactfeethresholdService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_CONTRACTFEETHRESHOLD')
 
  async update(@Param('id') id: string, @Body() updateContactfeethresholdDto: UpdateContactfeethresholdDto) {
    return await this.contactfeethresholdService.update(+id, updateContactfeethresholdDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_CONTRACTFEETHRESHOLD') 
  async remove(@Param('id') id: string) {
    return await this.contactfeethresholdService.remove(+id);
  }
}
