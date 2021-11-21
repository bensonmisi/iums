import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AdminmenusService } from './adminmenus.service';


@Controller('admin/adminmenus')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
export class AdminmenusController {
  constructor(private readonly adminmenusService: AdminmenusService) {}
  @Get()
 async getMenus(@Request() req):Promise<any>{
   const user = req.user
 return await this.adminmenusService.getMenus(user.roleId)
 }
}
