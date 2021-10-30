import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { ChangeAdministratorStatusDto } from './dto/change-administrator-status.dto';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Get()
  findAll() {
    return this.administratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorService.update(+id, updateAdministratorDto);
  }

  @Post('ChangeStatus')
  async changeStatus(@Body() statusDto:ChangeAdministratorStatusDto):Promise<any> {
    const {id,status} = statusDto
    return await this.administratorService.changestatus(id,status)
  }

  @Get('/resetPassword/:id')
  async resetPassword(@Param() id:number){
    return await this.administratorService.resetPassword(id)
  }
}
