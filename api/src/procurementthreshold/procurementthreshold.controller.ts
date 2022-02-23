import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProcurementthresholdService } from './procurementthreshold.service';
import { CreateProcurementthresholdDto } from './dto/create-procurementthreshold.dto';
import { UpdateProcurementthresholdDto } from './dto/update-procurementthreshold.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/procurementthreshold')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ADMIN')
export class ProcurementthresholdController {
  constructor(private readonly procurementthresholdService: ProcurementthresholdService) {}

  @Post()

  @HasPermission('CREATE_PROCURMENT_THRESHOLD')
  async create(@Body() createProcurementthresholdDto: CreateProcurementthresholdDto,@Request() req) {
    const user = req.user
    return await this.procurementthresholdService.create(createProcurementthresholdDto,user.userId);
  }

  @Get(':id')
  @HasPermission('GET_PROCURMENT_THRESHOLDS')
  async findAll(@Param('id') id:string) {
    return await this.procurementthresholdService.findAll(+id);
  }

 
  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateProcurementthresholdDto: UpdateProcurementthresholdDto,@Request() req) {
   const user = req.user
    return await this.procurementthresholdService.update(+id, updateProcurementthresholdDto,user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.procurementthresholdService.remove(+id,user.userId);
  }
}
