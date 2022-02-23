import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProcurementclassificationService } from './procurementclassification.service';
import { CreateProcurementclassificationDto } from './dto/create-procurementclassification.dto';
import { UpdateProcurementclassificationDto } from './dto/update-procurementclassification.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/procurementclassification')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class ProcurementclassificationController {
  constructor(private readonly procurementclassificationService: ProcurementclassificationService) {}

  @Post()
  @HasPermission('CREATE_CLASSIFICATION')
 async create(@Body() createProcurementclassificationDto: CreateProcurementclassificationDto,@Request() req) {
    const user = req.user
    return await this.procurementclassificationService.create(createProcurementclassificationDto,user.userId);
  }

  @Get()
  @HasPermission('GET_CLASSIFICATION')
 async findAll() {
    return await this.procurementclassificationService.findAll();
  }

 
  @Patch(':id')
  @HasPermission('UPDATE_CLASSIFICATION')
  update(@Param('id') id: string, @Body() updateProcurementclassificationDto: UpdateProcurementclassificationDto,@Request() req) {
    const user = req
    return this.procurementclassificationService.update(+id, updateProcurementclassificationDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_CLASSIFICATION')
  remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return this.procurementclassificationService.remove(+id,user.userId);
  }
}
