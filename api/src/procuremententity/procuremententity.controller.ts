import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcuremententityService } from './procuremententity.service';
import { CreateProcuremententityDto } from './dto/create-procuremententity.dto';
import { UpdateProcuremententityDto } from './dto/update-procuremententity.dto';

@Controller('procuremententity')
export class ProcuremententityController {
  constructor(private readonly procuremententityService: ProcuremententityService) {}

  @Post()
  create(@Body() createProcuremententityDto: CreateProcuremententityDto) {
    return this.procuremententityService.create(createProcuremententityDto);
  }

  @Get()
  findAll() {
    return this.procuremententityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procuremententityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcuremententityDto: UpdateProcuremententityDto) {
    return this.procuremententityService.update(+id, updateProcuremententityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procuremententityService.remove(+id);
  }
}
