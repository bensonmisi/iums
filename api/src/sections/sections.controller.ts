import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/section')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @HasPermission('CREATE_SECTION')
  async create(@Body() createSectionDto: CreateSectionDto) {
    return await this.sectionsService.create(createSectionDto);
  }

  @Get()
  @HasPermission('GET_SECTIONS')
  async findAll() {
    return await this.sectionsService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_SECTION')
  async findOne(@Param('id') id: string) {
    return await this.sectionsService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_SECTION')
  async update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return await this.sectionsService.update(+id, updateSectionDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_SECTION')
  async remove(@Param('id') id: string) {
    return await this.sectionsService.remove(+id);
  }
}
