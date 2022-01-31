import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('bidder/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService:DashboardService){}
  @Get()
  async getDashboard(@Request() req){
      const user = req.user
      return await this.dashboardService.getData(user.userId)
  }


}
