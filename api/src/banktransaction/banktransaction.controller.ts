import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { BanktransactionService } from './banktransaction.service';
import { SearchDto } from './dto/search.dto';

@Controller('admin/banktransaction')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class BanktransactionController {
  constructor(private readonly banktransactionService: BanktransactionService) {}

  @Get()
  @HasPermission('VIEW_BANKTRANSACTIONS')
  async getCurrent(){
    return await this.banktransactionService.getCurrenct()
  }

  @Post()
  @HasPermission('SEARCH_BANKTRANSACTIONS')
  async search(@Body() searchDto:SearchDto):Promise<any>{
    return await this.banktransactionService.search(searchDto)
  }

  @Post('claim')
  @HasPermission('CLAIM_BANKTRANSACTIONS')
  async claim(@Body() data:any):Promise<any>{
    return await this.banktransactionService.claim(data)
  }

}
