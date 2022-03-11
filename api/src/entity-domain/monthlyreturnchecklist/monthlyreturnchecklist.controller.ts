import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonthlyreturnchecklistService } from './monthlyreturnchecklist.service';
import { CreateMonthlyreturnchecklistDto } from './dto/create-monthlyreturnchecklist.dto';
import { UpdateMonthlyreturnchecklistDto } from './dto/update-monthlyreturnchecklist.dto';

@Controller('monthlyreturnchecklist')
export class MonthlyreturnchecklistController {
  constructor(private readonly monthlyreturnchecklistService: MonthlyreturnchecklistService) {}

  @Post()
  create(@Body() createMonthlyreturnchecklistDto: CreateMonthlyreturnchecklistDto) {
    return this.monthlyreturnchecklistService.create(createMonthlyreturnchecklistDto);
  }

  @Get()
  findAll() {
    return this.monthlyreturnchecklistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monthlyreturnchecklistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonthlyreturnchecklistDto: UpdateMonthlyreturnchecklistDto) {
    return this.monthlyreturnchecklistService.update(+id, updateMonthlyreturnchecklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monthlyreturnchecklistService.remove(+id);
  }
}
