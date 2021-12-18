import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { BidbondthresholdService } from './bidbondthreshold.service';
import { CreateBidbondthresholdDto } from './dto/create-bidbondthreshold.dto';
import { UpdateBidbondthresholdDto } from './dto/update-bidbondthreshold.dto';

@Controller('admin/bidbondthreshold')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class BidbondthresholdController {
  constructor(private readonly bidbondthresholdService: BidbondthresholdService) {}

  @Post()
  @HasPermission('CREATE_BIDBONDTHRESHOLD')
  create(@Body() createBidbondthresholdDto: CreateBidbondthresholdDto,@Request() req) {
    const user = req.user
    createBidbondthresholdDto.administratorId = user.userId
    return this.bidbondthresholdService.create(createBidbondthresholdDto);
  }

  @Get()
  @HasPermission('VIEW_BIDBONDTHRESHOLD')
  findAll() {
    return this.bidbondthresholdService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_BIDBONDTHRESHOLD')
  findOne(@Param('id') id: string) {
    return this.bidbondthresholdService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_BIDBONDTHRESHOLD')
  update(@Param('id') id: string, @Body() updateBidbondthresholdDto: UpdateBidbondthresholdDto) {
    return this.bidbondthresholdService.update(+id, updateBidbondthresholdDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_BIDBONDTHRESHOLD')
  remove(@Param('id') id: string) {
    return this.bidbondthresholdService.remove(+id);
  }
}
