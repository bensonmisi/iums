import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MonthlyreturnService } from './monthlyreturn.service';
import { CreateMonthlyreturnDto } from './dto/create-monthlyreturn.dto';
import { UpdateMonthlyreturnDto } from './dto/update-monthlyreturn.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';

@Controller('entity-domain/monthlyreturn')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ENTITY')
export class MonthlyreturnController {
  constructor(private readonly monthlyreturnService: MonthlyreturnService) {}

  @Post()
  async create(@Body() createMonthlyreturnDto: CreateMonthlyreturnDto,@Request() req) {
    const user = req.user
    return await this.monthlyreturnService.create(createMonthlyreturnDto,user.userId);
  }

  @Get()
  async findAll(@Request() req) {
    const user = req.user
    return await this.monthlyreturnService.findAll(user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.monthlyreturnService.findOne(+id,user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonthlyreturnDto: UpdateMonthlyreturnDto) {
    return this.monthlyreturnService.update(+id, updateMonthlyreturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthlyreturnService.remove(+id);
  }
}
