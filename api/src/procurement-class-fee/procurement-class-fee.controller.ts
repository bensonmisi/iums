import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProcurementClassFeeService } from './procurement-class-fee.service';
import { CreateProcurementClassFeeDto } from './dto/create-procurement-class-fee.dto';
import { UpdateProcurementClassFeeDto } from './dto/update-procurement-class-fee.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/procurement-class-fee')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class ProcurementClassFeeController {
  constructor(private readonly procurementClassFeeService: ProcurementClassFeeService) {}

  @Post()
  @HasPermission('CREATE_PROCUREMENT_CLASS_FEE')
  async create(@Body() createProcurementClassFeeDto: CreateProcurementClassFeeDto,@Request() req) {
    const user = req.user
    return await this.procurementClassFeeService.create(createProcurementClassFeeDto,user.userId);
  }

  @Get()
  async findAll() {
    return await this.procurementClassFeeService.findAll();
  }


  @Patch(':id')
  @HasPermission('UPDATE_PROCUREMENT_CLASS_FEE')
  async update(@Param('id') id: string, @Body() updateProcurementClassFeeDto: UpdateProcurementClassFeeDto,@Request() req) {
    const user = req.user
    return await this.procurementClassFeeService.update(+id, updateProcurementClassFeeDto,user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.procurementClassFeeService.remove(+id,user.userId);
  }
}
