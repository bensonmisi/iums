import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MonthlyreturndataService } from './monthlyreturndata.service';
import { CreateMonthlyreturndatumDto } from './dto/create-monthlyreturndatum.dto';
import { UpdateMonthlyreturndatumDto } from './dto/update-monthlyreturndatum.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';

@Controller('entity-domain/monthlyreturndata')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ENTITY')
export class MonthlyreturndataController {
  constructor(private readonly monthlyreturndataService: MonthlyreturndataService) {}

  @Post()
  async create(@Body() createMonthlyreturndatumDto: CreateMonthlyreturndatumDto,@Request() req) {
    const user = req.user
    return await this.monthlyreturndataService.create(createMonthlyreturndatumDto,user.userId);
  }

  @Get()
  findAll() {
    return this.monthlyreturndataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthlyreturndataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonthlyreturndatumDto: UpdateMonthlyreturndatumDto) {
    return this.monthlyreturndataService.update(+id, updateMonthlyreturndatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthlyreturndataService.remove(+id);
  }
}
