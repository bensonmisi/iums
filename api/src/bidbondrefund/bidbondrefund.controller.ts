import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { BidbondrefundService } from './bidbondrefund.service';
import { Refundschedule } from './dto/create-refundschedule.dto';
import { UpdaterefundscheduleDto } from './dto/update-refundschedule.dto';

@Controller('admin/bidbondrefund')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class BidbondrefundController {
    constructor(private readonly bidbondrefundService:BidbondrefundService){}

    @Get(':id')
    @HasPermission('GET_REFUNDSCHEDULES')
    async getList(@Param('id') id:string){
        return await this.bidbondrefundService.getSchedulelist(+id)
    }
    
    @Post()
    @HasPermission('CREATE_REFUNDSCHEDULE')
    async add(@Body() refundscheduleDto:Refundschedule,@Request() req){
     const user = req.user
      refundscheduleDto.initiator = user.userId
     return await this.bidbondrefundService.addSchedule(refundscheduleDto)   
    }

    @Patch(':id')
    @HasPermission('UPDATE_REFUNDSCHEDULE')
    async update(@Param('id') id:string,@Body() updaterefundscheduleDto:UpdaterefundscheduleDto,@Request() req){
        const user = req.user
        return await this.bidbondrefundService.updateSchedule(+id,updaterefundscheduleDto)
    }

    @Get('notify/:id')
    async notify(@Param('id') id:string){
     return await this.bidbondrefundService.notify(+id)
    }

    @Get('approve/:id')
    async approve(@Param('id') id:string,@Request() req){
        const user = req.user
        return await this.bidbondrefundService.approveScheduleItem(+id,user.userId)
    }


}
