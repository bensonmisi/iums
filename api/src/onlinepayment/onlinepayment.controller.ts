import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnlinepaymentService } from './onlinepayment.service';
import { CreateOnlinepaymentDto } from './dto/create-onlinepayment.dto';
import { UpdateOnlinepaymentDto } from './dto/update-onlinepayment.dto';

@Controller('onlinepayment')
export class OnlinepaymentController {
  constructor(private readonly onlinepaymentService: OnlinepaymentService) {}

  @Post()
  create(@Body() createOnlinepaymentDto: CreateOnlinepaymentDto) {
    return this.onlinepaymentService.create(createOnlinepaymentDto);
  }

  @Get()
  findAll() {
    return this.onlinepaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onlinepaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnlinepaymentDto: UpdateOnlinepaymentDto) {
    return this.onlinepaymentService.update(+id, updateOnlinepaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onlinepaymentService.remove(+id);
  }
}
