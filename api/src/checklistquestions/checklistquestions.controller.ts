import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { ChecklistquestionsService } from './checklistquestions.service';
import { CreateChecklistquestionDto } from './dto/create-checklistquestion.dto';
import { UpdateChecklistquestionDto } from './dto/update-checklistquestion.dto';

@Controller('admin/checklistquestions')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ADMIN')
export class ChecklistquestionsController {
  constructor(private readonly checklistquestionsService: ChecklistquestionsService) {}

  @Post()
  async create(@Body() createChecklistquestionDto: CreateChecklistquestionDto) {
    return await this.checklistquestionsService.create(createChecklistquestionDto);
  }

 
  @Get(':id') 
 async findAll(@Param('id') id: string) {
    return await this.checklistquestionsService.findAll(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecklistquestionDto: UpdateChecklistquestionDto) {
    return this.checklistquestionsService.update(+id, updateChecklistquestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistquestionsService.remove(+id);
  }
}
