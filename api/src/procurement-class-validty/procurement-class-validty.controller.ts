import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProcurementClassValidtyService } from './procurement-class-validty.service';
import { CreateProcurementClassValidtyDto } from './dto/create-procurement-class-validty.dto';
import { UpdateProcurementClassValidtyDto } from './dto/update-procurement-class-validty.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/procurement-class-validty')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class ProcurementClassValidtyController {
  constructor(private readonly procurementClassValidtyService: ProcurementClassValidtyService) {}

  @Post()
  @HasPermission('CREATE_PROCUREMENT_CLASS')
  async create(@Body() createProcurementClassValidtyDto: CreateProcurementClassValidtyDto,@Request() req) {
    const user = req.user
    return await this.procurementClassValidtyService.create(createProcurementClassValidtyDto,user.userId);
  }

  @Get()
 async  findAll() {
    return await this.procurementClassValidtyService.findAll();
  }



}
