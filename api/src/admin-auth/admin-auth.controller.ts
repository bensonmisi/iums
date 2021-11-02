import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AdminAuthDto } from './admin-auth.dto';
import { AdminAuthService } from './admin-auth.service';

@Controller('api/admin')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('auth')
  async Login(@Body() adminAuthDto:AdminAuthDto):Promise<any>{
    return await this.adminAuthService.Login(adminAuthDto)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req):Promise<any>{
    const  user  = req.user
    return await this.adminAuthService.getProfile(user.userId)
  }
}
