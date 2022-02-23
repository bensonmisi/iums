import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProcurementcategoryService } from './procurementcategory.service';
import { CreateProcurementcategoryDto } from './dto/create-procurementcategory.dto';
import { UpdateProcurementcategoryDto } from './dto/update-procurementcategory.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/procurementcategory')
@UseGuards(JwtAuthGuard)
export class ProcurementcategoryController {
  constructor(private readonly procurementcategoryService: ProcurementcategoryService) {}

  @Post()
  @HasPermission('CREATE_PROCUREMENTCATEGORY')
  async create(@Body() createProcurementcategoryDto: CreateProcurementcategoryDto,@Request() req) {
    const user = req.user
    return await this.procurementcategoryService.create(createProcurementcategoryDto,user.userId);
  }

  @Get()
  @HasPermission('GET_PROCUREMENTCATEGORIES')
  async findAll() {
    return await this.procurementcategoryService.findAll();
  }

  

  @Patch(':id')
  @HasPermission('UPDATE_PROCUREMENTCATEGORY')
  async update(@Param('id') id: string, @Body() updateProcurementcategoryDto: UpdateProcurementcategoryDto,@Request() req) {
    const user = req.user
    return this.procurementcategoryService.update(+id, updateProcurementcategoryDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_PROCUREMENTCATEGORY')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return this.procurementcategoryService.remove(+id,user.userId);
  }
}
