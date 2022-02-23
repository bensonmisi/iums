import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { CreateProcurementEntityUserDto } from './dto/create-procuremententity-user.dto';
import { UpdateProcurementEntityUserDto } from './dto/update-procuremententity-user.dto';
import { ProcuremententityUserService } from './procuremententity-user.service';

@Controller('admin/procuremententity-user')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class ProcuremententityUserController {
  constructor(private readonly procuremententityUserService: ProcuremententityUserService) {}

  @Get(':id')
  async findAll(@Param('id') id:string){
    return await this.procuremententityUserService.findAll(+id)
  }

  @Post()
  async create(@Body() createProcurementEntityUserDto:CreateProcurementEntityUserDto,@Request() req){
    const user = req.user
    return await this.procuremententityUserService.create(createProcurementEntityUserDto,user.userId)
  }

  @Patch(':id')
  async update(@Param('id') id:string, @Body() updateProcurementEntityUserDto:UpdateProcurementEntityUserDto,@Request() req){
   const user = req.user 
   return await this.procuremententityUserService.update(+id,updateProcurementEntityUserDto,user.userId)
  }

  @Delete(':id')
  async delete(@Param('id') id:string,@Request() req){
    const user = req.user
    return await this.procuremententityUserService.remove(+id,user.userId)
  }
}
