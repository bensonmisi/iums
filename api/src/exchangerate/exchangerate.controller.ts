import { Controller, Get, Post, Body, Patch, Param, Delete ,Request, UseGuards} from '@nestjs/common';
import { ExchangerateService } from './exchangerate.service';
import { CreateExchangerateDto } from './dto/create-exchangerate.dto';
import { UpdateExchangerateDto } from './dto/update-exchangerate.dto';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';

@Controller('admin/exchangerate')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class ExchangerateController {
  constructor(private readonly exchangerateService: ExchangerateService) {}

  @Post()
  @HasPermission('CREATE_EXCHANGERATE')
  async create(@Body() createExchangerateDto: CreateExchangerateDto,@Request() req) {
    const user = req.user
    return await this.exchangerateService.create(createExchangerateDto,user.userId);
  }

  @Get()
  @HasPermission('GET_EXCHANGERATES')
 async findAll() {
    return await this.exchangerateService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_PERMISSION')
 async findOne(@Param('id') id: string) {
    return await this.exchangerateService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_PERMISSION')
  async update(@Param('id') id: string, @Body() updateExchangerateDto: UpdateExchangerateDto) {
    return await this.exchangerateService.update(+id, updateExchangerateDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_PERMISSION')
  async remove(@Param('id') id: string) {
    return await this.exchangerateService.remove(+id);
  }
}
