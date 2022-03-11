import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { EntitybidbondService } from './entitybidbond.service';

@Controller('entity-domain/entitybidbond')
@UseGuards(JwtAuthGuard)
export class EntitybidbondController {
  constructor(private readonly entitybidbondService: EntitybidbondService) {}

  @Get()
  async getBidbonds(@Request() req){
    const user = req.user
    return await this.entitybidbondService.getData(user.userId)
  }
}
