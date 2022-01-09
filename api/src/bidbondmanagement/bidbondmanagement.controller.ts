import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { BidbondmanagementService } from './bidbondmanagement.service';

@Controller('admin/bidbondmanagement')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class BidbondmanagementController {
    constructor(private readonly bidbondmanagementService:BidbondmanagementService){}
    @Get()
    @HasPermission('VIEW_BIDBONDS')
    async getList(){
      return await this.bidbondmanagementService.getList()
    }

    @Get(":id")
    @HasPermission('VIEW_BIDBONDS')
    async getRecords(@Param('id') id:string){
       return await this.bidbondmanagementService.getDetails(+id)
    }
  
}
