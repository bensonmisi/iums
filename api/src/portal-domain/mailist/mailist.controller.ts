import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MailistService } from './mailist.service';
import { CreateMailistDto } from './dto/create-mailist.dto';
import { UpdateMailistDto } from './dto/update-mailist.dto';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';

@Controller('bidder/mailist')
@UseGuards(JwtAuthGuard)
export class MailistController {
  constructor(private readonly mailistService: MailistService) {}

  @Post()
  async create(@Body() createMailistDto: CreateMailistDto,@Request() req) {
    const user = req.user
    return await this.mailistService.create(createMailistDto,user.userId);
  }

 

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMailistDto: UpdateMailistDto,@Request() req) {
    const user = req.user
    return await this.mailistService.update(+id, updateMailistDto,user.userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Request() req) {
    const user = req.user
    return await this.mailistService.remove(+id,user.userId);
  }
}
