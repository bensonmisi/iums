import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';

@Controller('admin/currency')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @HasPermission('CREATE_CURRENCY')
  async create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return await this.currencyService.create(createCurrencyDto);
  }

  @Get()
  @HasPermission('GET_CURRENCIES')
  async findAll() {
    return await this.currencyService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_CURRENCY')
  async findOne(@Param('id') id: string) {
    return await this.currencyService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_CURRENCY')
  async update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return  await this.currencyService.update(+id, updateCurrencyDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_CURRENCY')
  async remove(@Param('id') id: string) {
    return await this.currencyService.remove(+id);
  }
}
