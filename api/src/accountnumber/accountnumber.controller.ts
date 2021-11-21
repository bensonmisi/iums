import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccountnumberService } from './accountnumber.service';
import { CreateAccountnumberDto } from './dto/create-accountnumber.dto';
import { UpdateAccountnumberDto } from './dto/update-accountnumber.dto';
import { Accountnumber } from './entities/accountnumber.entity';

@Controller('admin/accountnumbers')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class AccountnumberController {
  constructor(private readonly accountnumberService: AccountnumberService) {}

  @Post()
  @HasPermission('CREATE_ACCOUNTNUMBER')
  async create(@Body() createAccountnumberDto: CreateAccountnumberDto):Promise<any> {
    return await this.accountnumberService.create(createAccountnumberDto);
  }

  @Get()
  @HasPermission('VIEW_ACCOUNTNUMBERS')
  async findAll():Promise<Accountnumber[]> {
    return await this.accountnumberService.findAll();
  }

  @Get(':id')
  @HasPermission('VIEW_ACCOUNTNUMBER')
  async findOne(@Param('id') id: string):Promise<Accountnumber> {
    return await this.accountnumberService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_ACCOUNTNUMBER')
  async update(@Param('id') id: string, @Body() updateAccountnumberDto: UpdateAccountnumberDto) {
    return await this.accountnumberService.update(+id, updateAccountnumberDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_ACCOUNTNUMBER')
  async remove(@Param('id') id: string) {
    return await this.accountnumberService.remove(+id);
  }
}
