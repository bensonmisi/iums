import { Controller, Get, Request } from '@nestjs/common';
import { AdminmenusService } from './adminmenus.service';

@Controller('api/admin/adminmenus')
export class AdminmenusController {
  constructor(private readonly adminmenusService: AdminmenusService) {}
  @Get()
 async getMenus(@Request() req){
 return await this.adminmenusService.getMenus(1)
 }
}
