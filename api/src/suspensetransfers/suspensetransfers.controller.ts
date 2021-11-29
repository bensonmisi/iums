import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { SuspensetransfersService } from './suspensetransfers.service';
import { CreateSuspensetransferDto } from './dto/create-suspensetransfer.dto';
import { UpdateSuspensetransferDto } from './dto/update-suspensetransfer.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { DecisionDto } from 'src/manualtransaction/dto/decision.dto';

@Controller('admin/suspensetransfers')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class SuspensetransfersController {
  constructor(private readonly suspensetransfersService: SuspensetransfersService) {}

  @Post()
  @HasPermission('CREATE_SUSPENSE_TRANSFER')
 async create(@Body() createSuspensetransferDto: CreateSuspensetransferDto,@Request() req):Promise<any> {
    const user = req.user
    return await this.suspensetransfersService.create(createSuspensetransferDto,user.userId);
  }

  @Get()
  @HasPermission('GET_SUSPENSE_TRANSFERS')
  async findAll() {
    return this.suspensetransfersService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_SUSPENSE_TRANSFER')
  async findOne(@Param('id') id: string) {
    return this.suspensetransfersService.findOne(+id);
  }
  @Get('source/:id')
  async source(@Param('id') id: string) {
    return this.suspensetransfersService.source_funds(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_SUSPENSE_TRANSFER')
  update(@Param('id') id: string, @Body() updateSuspensetransferDto: UpdateSuspensetransferDto,@Request() req) {
    const user = req.user
    return this.suspensetransfersService.update(+id, updateSuspensetransferDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_SUSPENSE_TRANSFER')
  remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return this.suspensetransfersService.remove(+id,user.userId);
  }


  @Post('decision')
  @HasPermission('DECISION_SUSPENSE_TRANSFER')
  async decision(@Body() decisionDto:DecisionDto,@Request() req):Promise<any>{
    const user = req.user
    return this.suspensetransfersService.decision(decisionDto,user.id)
  }
}
