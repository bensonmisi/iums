import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RegistrationoptionService } from './registrationoption.service';
import { CreateRegistrationoptionDto } from './dto/create-registrationoption.dto';
import { UpdateRegistrationoptionDto } from './dto/update-registrationoption.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';

@Controller('admin/registrationoption')
@UseGuards(JwtAuthGuard)
@HasAccesslevel('ADMIN')
export class RegistrationoptionController {
  constructor(private readonly registrationoptionService: RegistrationoptionService) {}

  @Post()
  @HasPermission('CREATE_OPTION')
  async create(@Body() createRegistrationoptionDto: CreateRegistrationoptionDto,@Request() req) {
    const user = req.user
    createRegistrationoptionDto.creator = user.userId
    return await this.registrationoptionService.create(createRegistrationoptionDto);
  }

  @Get()
  async findAll() {
    return await this.registrationoptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationoptionService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_OPTION')
  async update(@Param('id') id: string, @Body() updateRegistrationoptionDto: UpdateRegistrationoptionDto,@Request() req) {
    const user = req.user
    return await this.registrationoptionService.update(+id, updateRegistrationoptionDto,user.userId);
  }

  @Delete(':id')
  @HasPermission('DELETE_OPTION')
  remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return this.registrationoptionService.remove(+id,user.userId);
  }
}
