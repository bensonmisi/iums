import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('admin/bank')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @HasPermission('CREATE_BANK')
  create(@Body() createBankDto: CreateBankDto) {
    return this.bankService.create(createBankDto);
  }

  @Get()
  @HasPermission('GET_BANKS')
  findAll() {
    return this.bankService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_BANK')
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_BANK')
  update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return this.bankService.update(+id, updateBankDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_BANK')
  remove(@Param('id') id: string) {
    return this.bankService.remove(+id);
  }
}
