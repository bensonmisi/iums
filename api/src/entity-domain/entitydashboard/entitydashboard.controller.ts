import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { EntitydashboardService } from './entitydashboard.service';

@Controller('entity-domain/dashboard')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ENTITY')
export class EntitydashboardController {
  constructor(private readonly entitydashboardService: EntitydashboardService) {}

  @Get()
  async getDashboard(@Request() req){
    const user = req.user
    return await this.entitydashboardService.dashboard(user.userId)
  }
}
