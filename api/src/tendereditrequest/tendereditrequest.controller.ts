import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TendereditrequestService } from './tendereditrequest.service';
import { CreateTendereditrequestDto } from './dto/create-tendereditrequest.dto';
import { UpdateTendereditrequestDto } from './dto/update-tendereditrequest.dto';

@Controller('tendereditrequest')
export class TendereditrequestController {
  constructor(private readonly tendereditrequestService: TendereditrequestService) {}

  @Post()
  create(@Body() createTendereditrequestDto: CreateTendereditrequestDto) {
    return this.tendereditrequestService.create(createTendereditrequestDto);
  }

  @Get()
  findAll() {
    return this.tendereditrequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tendereditrequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTendereditrequestDto: UpdateTendereditrequestDto) {
    return this.tendereditrequestService.update(+id, updateTendereditrequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tendereditrequestService.remove(+id);
  }
}
