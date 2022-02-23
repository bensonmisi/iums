import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProcurementmanagementunitService } from './procurementmanagementunit.service';
import { CreateProcurementmanagementunitDto } from './dto/create-procurementmanagementunit.dto';
import { UpdateProcurementmanagementunitDto } from './dto/update-procurementmanagementunit.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
@Controller('entity-domain/procurementmanagementunit')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class ProcurementmanagementunitController {
  constructor(private readonly procurementmanagementunitService: ProcurementmanagementunitService) {}

  @Post()
  @HasPermission('CREATE_PMU')
  async create(@Body() createDto:CreateProcurementmanagementunitDto,@Request() req) {   
      const user = req.user     
      return await this.procurementmanagementunitService.create(createDto,user.userId);
          
 
  }

  @Get()
  @HasPermission('GET_PMU')
  async findAll(@Request() req) {
    const user = req.user
    return await this.procurementmanagementunitService.findAll(user.userId);
  }

  @HasPermission('UPDATE_PMU')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProcurementmanagementunitDto: UpdateProcurementmanagementunitDto,@Request() req) {
    const user = req.user
    return await this.procurementmanagementunitService.update(+id, updateProcurementmanagementunitDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_PMU')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.procurementmanagementunitService.remove(+id,user.userId);
  }
}
