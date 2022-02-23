import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UomService } from './uom.service';
import { CreateUomDto } from './dto/create-uom.dto';
import { UpdateUomDto } from './dto/update-uom.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/uom')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class UomController {
  constructor(private readonly uomService: UomService) {}

  @Post()
  @HasPermission('CREATE_UOM')
  async create(@Body() createUomDto: CreateUomDto,@Request() req) {
    const user = req.user
    return await this.uomService.create(createUomDto,user.userId);
  }

  @Get()
  @HasPermission('GET_UOMS')
  async findAll() {
    return this.uomService.findAll();
  }

 

  @Patch(':id')
  @HasPermission('UPDATE_UOM')
  async update(@Param('id') id: string, @Body() updateUomDto: UpdateUomDto,@Request() req) {
    const user = req.user
    return this.uomService.update(+id, updateUomDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_UOM')
 async remove(@Param('id') id: string,@Request() req) {
   const user = req.user
    return this.uomService.remove(+id,user.userId);
  }
}
