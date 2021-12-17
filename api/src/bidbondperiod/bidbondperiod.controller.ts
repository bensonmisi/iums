import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { BidbondperiodService } from './bidbondperiod.service';
import { CreateBidbondperiodDto } from './dto/create-bidbondperiod.dto';
import { UpdateBidbondperiodDto } from './dto/update-bidbondperiod.dto';
import { Bidbondperiod } from './entities/bidbondperiod.entity';

@Controller('admin/bidbondperiods')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class BidbondperiodController {
  constructor(private readonly bidbondperiodService: BidbondperiodService) {}

  @Post()
  @HasPermission('CREATE_BIDBONDPERIOD')
  async create(@Body() createBidbondperiodDto: CreateBidbondperiodDto):Promise<any> {
    return await this.bidbondperiodService.create(createBidbondperiodDto);
  }

  @Get()
  @HasPermission('VIEW_BIDBONDPERIODS')
  async findAll():Promise<Bidbondperiod[]> {
    return await this.bidbondperiodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bidbondperiodService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_BIDBONDPERIOD')
  async update(@Param('id') id: string, @Body() updateBidbondperiodDto: UpdateBidbondperiodDto):Promise<any> {
    return await this.bidbondperiodService.update(+id, updateBidbondperiodDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_BIDBONDPERIOD')
  async remove(@Param('id') id: string):Promise<any> {
    return await this.bidbondperiodService.remove(+id);
  }
}
