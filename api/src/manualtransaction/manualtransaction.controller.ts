import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ManualtransactionService } from './manualtransaction.service';
import { CreateManualtransactionDto } from './dto/create-manualtransaction.dto';
import { UpdateManualtransactionDto } from './dto/update-manualtransaction.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { DecisionDto } from './dto/decision.dto';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/manualtransactions')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class ManualtransactionController {
  constructor(private readonly manualtransactionService: ManualtransactionService) {}

  @Post()
  @HasPermission('CREATE_MANAUL_TRANSACTION_REQUEST')
  async create(@Body() createManualtransactionDto: CreateManualtransactionDto,@Request() req) {
    const user = req.user
    return await this.manualtransactionService.create(createManualtransactionDto,user.userId);
  }

  @Get()
  @HasPermission('VIEW_MANAUL_TRANSACTION_REQUESTS')
  async findAll() {
    return await this.manualtransactionService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_MANAUL_TRANSACTION_REQUEST')
  async findOne(@Param('id') id: string) {
    return await this.manualtransactionService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_MANAUL_TRANSACTION_REQUEST')
async update(@Param('id') id: string, @Body() updateManualtransactionDto: UpdateManualtransactionDto,@Request() req) {
    const user = req.user
    return await this.manualtransactionService.update(+id, updateManualtransactionDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_MANAUL_TRANSACTION_REQUEST')
 async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.manualtransactionService.remove(+id,user.id);
  }

  @Post('decision')
  @HasPermission('DECISION_MANUAL_TRANSACTION_REQUEST')
  async declare(@Body() decisionDto:DecisionDto,@Request() req):Promise<any>{
    const user = req.user
    return await this.manualtransactionService.decision(decisionDto,user.userId)
  }

}
