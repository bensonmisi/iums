import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountprofileService } from './accountprofile.service';
import { CreateAccountprofileDto } from './dto/create-accountprofile.dto';
import { UpdateAccountprofileDto } from './dto/update-accountprofile.dto';

@Controller('accountprofile')
export class AccountprofileController {
  constructor(private readonly accountprofileService: AccountprofileService) {}

  @Post()
  create(@Body() createAccountprofileDto: CreateAccountprofileDto) {
    return this.accountprofileService.create(createAccountprofileDto);
  }

  @Get()
  findAll() {
    return this.accountprofileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountprofileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountprofileDto: UpdateAccountprofileDto) {
    return this.accountprofileService.update(+id, updateAccountprofileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountprofileService.remove(+id);
  }
}
