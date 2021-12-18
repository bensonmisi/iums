import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TenderfeetypeService } from './tenderfeetype.service';
import { CreateTenderfeetypeDto } from './dto/create-tenderfeetype.dto';
import { UpdateTenderfeetypeDto } from './dto/update-tenderfeetype.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/tenderfeetype')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class TenderfeetypeController {
  constructor(private readonly tenderfeetypeService: TenderfeetypeService) {}

  @Post()
  @HasPermission('CREATE_TENDERFEETYPE')
  create(@Body() createTenderfeetypeDto: CreateTenderfeetypeDto) {
    return this.tenderfeetypeService.create(createTenderfeetypeDto);
  }

  @Get()
  @HasPermission('VIEW_TENDERFEETYPES')
  findAll() {
    return this.tenderfeetypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderfeetypeService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_TENDERFEETYPE')
  update(@Param('id') id: string, @Body() updateTenderfeetypeDto: UpdateTenderfeetypeDto) {
    return this.tenderfeetypeService.update(+id, updateTenderfeetypeDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_TENDERFEETYPE')
  remove(@Param('id') id: string) {
    return this.tenderfeetypeService.remove(+id);
  }
}
