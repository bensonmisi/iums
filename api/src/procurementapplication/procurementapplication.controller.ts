import { Body, Controller, Get, Param, Patch, Request, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { ProcurementapplicationService } from './procurementapplication.service';

@Controller('admin/procurementapplication')

export class ProcurementapplicationController {
  constructor(private readonly procurementapplicationService: ProcurementapplicationService) {}
  

  @Get()
  @UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
  @HasPermission('GET_APPLICATIONS')
  async getApplication(){
  return await this.procurementapplicationService.getData()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
  @HasPermission('GET_APPLICATION')
  async getRecord(@Param('id') id:string,@Request() req){
    const user = req.user
    return await this.procurementapplicationService.getRecord(+id,user.userId)
  }

  @Get('cv/:id')
  async downloadCV(@Param('id') id:string,@Res() res)/*:Promise<StreamableFile>*/{
         const record = await this.procurementapplicationService.getCv(+id)
        // const file = createReadStream(join(process.cwd(),'public/'+record.cv))
        // return new StreamableFile(file)

        return res.sendFile(record.cv,{root:'public'})
  }

  @Get('signature/:id')
  async downloadSignature(@Param('id') id:string,@Res() res){
         const record = await this.procurementapplicationService.getCv(+id)
         return res.sendFile(record.signature,{root:'public'})
  }

  @Get('fullorganogram/:id')
  async downloadOrganorgam(@Param('id') id:string,@Res() res):Promise<StreamableFile>{
         const record = await this.procurementapplicationService.downloadOrganogram(+id)
         return res.sendFile(record.full,{root:'public'})
       
  }

  @Get('pmuorganogram/:id')
  async downloadpmuOrganorgam(@Param('id') id:string,@Res() res){
         const record = await this.procurementapplicationService.downloadOrganogram(+id)
         return res.sendFile(record.pmu,{root:'public'})
  }

  @Get('plan/:id')
  async downloadplan(@Param('id') id:string,@Res() res){
         const record = await this.procurementapplicationService.dowloadplan(+id)
         return res.sendFile(record.filename,{root:'public'})
  }

  @Patch('assign/:id')
  @UseGuards(JwtAuthGuard)
  @HasAccesslevel('ADMIN')
 @HasPermission('ASSIGN_CLASS')
  async assignclass(@Param('id') id:string,@Body() formdata:any,@Request() req){
         const user = req.user 
         return  await this.procurementapplicationService.assignclass(+id,formdata,user.userId)
  }
}
