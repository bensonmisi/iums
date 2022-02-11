import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { TenderreceiptingService } from './tenderreceipting.service';

@Controller('bidder/tenderreceipting')
@UseGuards(JwtAuthGuard)
export class TenderreceiptingController {
  constructor(private readonly tenderreceiptingService: TenderreceiptingService) {}

  @Get(':invoicenumber')
  async getData(@Param('invoicenumber') invoicenumber:string,@Request() req)
  {
    const user = req.user
    return await this.tenderreceiptingService.getReceipts(invoicenumber,user.userId) 
  }

  @Post()
  async settle(@Body() formdata:any,@Request() req){
    const user = req.user
    return await this.tenderreceiptingService.settle(formdata,user.userId)
  }
}
