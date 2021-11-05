import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AdminmenusService } from './adminmenus.service';


@Controller('api/admin/adminmenus')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
export class AdminmenusController {
  constructor(private readonly adminmenusService: AdminmenusService) {}
  @Get()
 async getMenus(@Request() req){
   const user = req.user
 return await this.adminmenusService.getMenus(user.roleId)
 }
}
