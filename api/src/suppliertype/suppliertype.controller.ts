import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuppliertypeService } from './suppliertype.service';
import { CreateSuppliertypeDto } from './dto/create-suppliertype.dto';
import { UpdateSuppliertypeDto } from './dto/update-suppliertype.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/suppliertype')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class SuppliertypeController {
  constructor(private readonly suppliertypeService: SuppliertypeService) {}

  @Post()
  @HasPermission('CREATE_SUPPLIERTYPE')
  create(@Body() createSuppliertypeDto: CreateSuppliertypeDto) {
    return this.suppliertypeService.create(createSuppliertypeDto);
  }

  @Get()
  @HasPermission('GET_SUPPLIERTYPES')
  findAll() {
    return this.suppliertypeService.findAll();
  }

  @Get('/report/summary')
  @HasPermission('GET_SUPPLIERTYPE_SUMMARY')
  async summarylist(){
    return await this.suppliertypeService.summary()
  }
  @Get(':id')
  @HasPermission('GET_SUPPLIERTYPE')
  findOne(@Param('id') id: string) {
    return this.suppliertypeService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_SUPPLIERTYPE')
  update(@Param('id') id: string, @Body() updateSuppliertypeDto: UpdateSuppliertypeDto) {
    return this.suppliertypeService.update(+id, updateSuppliertypeDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_SUPPLIERTYPE')
  remove(@Param('id') id: string) {
    return this.suppliertypeService.remove(+id);
  }
}
