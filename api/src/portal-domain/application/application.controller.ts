import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { ApplicationService } from './application.service';

@Controller('bidder/application')
@UseGuards(JwtAuthGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  async FindAll(@Request() req){
    const user = req.user
    return await this.applicationService.getAll(user.userId)
  }

  @Get(':id')
  async download(@Param('id') id:string,@Request() req){
    const user = req.user
    return await this.applicationService.download(+id,user.userId)
  }
}
