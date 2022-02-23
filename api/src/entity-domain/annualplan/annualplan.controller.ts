import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AnnualplanService } from './annualplan.service';
import { CreateAnnualplanDto } from './dto/create-annualplan.dto';
import { UpdateAnnualplanDto } from './dto/update-annualplan.dto';

@Controller('entity-domain/annualplan')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class AnnualplanController {
  constructor(private readonly annualplanService: AnnualplanService) {}

  @Post()
  @HasPermission('CREATE_PLAN')
  create(@Body() createAnnualplanDto: CreateAnnualplanDto,@Request() req) {
    const user = req.user
    return this.annualplanService.create(createAnnualplanDto,user.userId);
  }

  @Get()
  @HasPermission('VIEW_PLAN')
  async  findAll(@Request() req) {
    const user = req.user
    return await this.annualplanService.findAll(user.userId);
  }

  @Get(':id')
  @HasPermission('APPROVE_PLAN')
  findOne(@Param('id') id: string,@Request() req) {
    const user = req.user
    return this.annualplanService.approve(user.userId);
  }

  @Patch(':id')
  @HasPermission('UPDATE_PLAN')
  async update(@Param('id') id: string, @Body() updateAnnualplanDto: UpdateAnnualplanDto,@Request() req) {
    const user = req.user
    return await this.annualplanService.update(+id, updateAnnualplanDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_PLAN')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return this.annualplanService.remove(+id,user.userId);
  }
}
