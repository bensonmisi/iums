import { Controller, Get, UseGuards ,Param} from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { ReturnchecklistService } from './returnchecklist.service';

@Controller('entity-domain/returnchecklist')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ENTITY')
export class ReturnchecklistController {
  constructor(private readonly returnchecklistService: ReturnchecklistService) {}

  @Get()
  async getAll(){
    return await this.returnchecklistService.getAll()
  }


  @Get(":id")
  async getChecklist(@Param("id") id:string){
    return await this.returnchecklistService.getChecklist(+id)
  }
}
