import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { ChecklistService } from './checklist.service';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';

@Controller('admin/checklist')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ADMIN')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  async create(@Body() createChecklistDto: CreateChecklistDto) {
    return await this.checklistService.create(createChecklistDto);
  }

  @Get()
  async findAll() {
    return await this.checklistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checklistService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChecklistDto: UpdateChecklistDto) {
    return await this.checklistService.update(+id, updateChecklistDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    return await this.checklistService.remove(+id);
  }
}
