import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountdocumentsService } from './accountdocuments.service';
import { CreateAccountdocumentDto } from './dto/create-accountdocument.dto';
import { UpdateAccountdocumentDto } from './dto/update-accountdocument.dto';

@Controller('accountdocuments')
export class AccountdocumentsController {
  constructor(private readonly accountdocumentsService: AccountdocumentsService) {}

  @Post()
  create(@Body() createAccountdocumentDto: CreateAccountdocumentDto) {
    return this.accountdocumentsService.create(createAccountdocumentDto);
  }

  @Get()
  findAll() { 
    return this.accountdocumentsService.findAll(); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountdocumentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountdocumentDto: UpdateAccountdocumentDto) {
    return this.accountdocumentsService.update(+id, updateAccountdocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountdocumentsService.remove(+id);
  }
}
