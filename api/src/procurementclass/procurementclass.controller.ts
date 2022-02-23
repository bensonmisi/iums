import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProcurementclassService } from './procurementclass.service';
import { CreateProcurementclassDto } from './dto/create-procurementclass.dto';
import { UpdateProcurementclassDto } from './dto/update-procurementclass.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';

@Controller('admin/procurementclass')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class ProcurementclassController {
  constructor(private readonly procurementclassService: ProcurementclassService) {}

  @Post()
 async create(@Body() createProcurementclassDto: CreateProcurementclassDto,@Request() req) {
   const user = req.user
    return await this.procurementclassService.create(createProcurementclassDto,user.userId);
  }

  @Get()
  async findAll() {
    return await this.procurementclassService.findAll();
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateProcurementclassDto: UpdateProcurementclassDto,@Request() req) {
  const user = req.user  
  return this.procurementclassService.update(+id, updateProcurementclassDto,user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return this.procurementclassService.remove(+id,user.userId);
  }
}
