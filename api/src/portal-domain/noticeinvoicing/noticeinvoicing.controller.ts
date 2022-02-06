import { Controller, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { NoticeinvoicingService } from './noticeinvoicing.service';

@Controller('bidder/noticeinvoicing')
@UseGuards(JwtAuthGuard)
export class NoticeinvoicingController {
  constructor(private readonly noticeinvoicingService: NoticeinvoicingService) {}

  @Get()
  async getList(@Request() req){ 
    const user = req.user
    return await this.noticeinvoicingService.getPending(user.userId)
  }

  @Get(':id')
  async addItem(@Param('id') id:string,@Request() req){
   const user = req.user
    return await this.noticeinvoicingService.addItem(+id,user.userId)
  }

  @Delete(':id')
  async removeItem(@Param('id') id:string,@Request() req){
    const user = req.user
    return await this.noticeinvoicingService.removeItem(+id,user.userId)
  }
}
