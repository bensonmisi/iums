import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { SettleDto } from './dto/settle.dto';
import { ReceiptingService } from './receipting.service';

@Controller('admin/receipting')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class ReceiptingController {
  constructor(private readonly receiptingService:ReceiptingService){}
    @Get(":id")
    async getData(@Param('id') id:string):Promise<any>{
       return await this.receiptingService.getData(+id)
    }

    @Post()
    async settle(@Body() settleDto:SettleDto,@Request() req){
      const user = req.user
      return await this.receiptingService.settle(settleDto.suspenseId,settleDto.invoiceId,user.userId)
    }
}
