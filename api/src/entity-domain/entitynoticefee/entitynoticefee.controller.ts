import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { EntitynoticefeeService } from './entitynoticefee.service';

@Controller('entity-domain/entitynoticefee')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ENTITY')
export class EntitynoticefeeController {
  constructor(private readonly entitynoticefeeService: EntitynoticefeeService) {}

  @Get(':id')
  async getFees(@Param('id') id:string){
    return await this.entitynoticefeeService.getFees(+id)
  }
}
