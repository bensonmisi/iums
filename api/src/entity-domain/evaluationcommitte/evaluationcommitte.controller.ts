import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EvaluationcommitteService } from './evaluationcommitte.service';
import { CreateEvaluationcommitteDto } from './dto/create-evaluationcommitte.dto';
import { UpdateEvaluationcommitteDto } from './dto/update-evaluationcommitte.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';

@Controller('entity-domain/evaluationcommitte')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class EvaluationcommitteController {
  constructor(private readonly evaluationcommitteService: EvaluationcommitteService) {}

  @Post()
  async create(@Body() createEvaluationcommitteDto: CreateEvaluationcommitteDto,@Request() req) {
    const user = req.user
    return await this.evaluationcommitteService.create(createEvaluationcommitteDto,user.userId);
  }

  @Get()
  async findAll(@Request() req) {
    const user = req.user
    return await this.evaluationcommitteService.findAll(user.userId);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEvaluationcommitteDto: UpdateEvaluationcommitteDto,@Request() req) {
    const user = req.user
    return await this.evaluationcommitteService.update(+id, updateEvaluationcommitteDto,user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.evaluationcommitteService.remove(+id,user.userId);
  }
}
