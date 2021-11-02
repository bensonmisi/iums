import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AdministratorService } from './administrator.service';
import { ChangeAdministratorStatusDto } from './dto/change-administrator-status.dto';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@Controller('api/admin/users')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  @HasPermission('CREATE_ADMINISTRATOR')
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  @HasPermission('GET_ADMINISTRATORS')
  findAll() {
    return this.administratorService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_ADMINISTRATOR')
  findOne(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_ADMINISTRATOR')
  update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorService.update(+id, updateAdministratorDto);
  }

  @Post('ChangeStatus')
  @HasPermission('CHANGE_STATUS')
  async changeStatus(@Body() statusDto:ChangeAdministratorStatusDto):Promise<any> {
    const {id,status} = statusDto
    return await this.administratorService.changestatus(id,status)
  }

  @Get('/resetPassword/:id')
  @HasPermission('RESET_PASSWORD')
  async resetPassword(@Param() id:number){
    return await this.administratorService.resetPassword(id)
  }
}
