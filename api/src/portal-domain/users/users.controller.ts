import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { CreateBidderUsersDto } from './dto/create-users.dto';
import { UpdateBidderUsersDto } from './dto/update-users.dto';
import { UsersService } from './users.service';

@Controller('bidder/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Request() req){
    const user = req.user
    return await this.usersService.findAll(user.userId)
  }

  @Post()
  async create(@Body() createBidderUsersDto:CreateBidderUsersDto,@Request() req){
    const user =req.user
    return await this.usersService.create(createBidderUsersDto,user.userId)
  }

  @Patch(':id')
  async update(@Param('id') id:string, @Body() updateBidderUsersDto:UpdateBidderUsersDto,@Request() req){
    const user = req.user
    return await this.usersService.update(+id,updateBidderUsersDto,user.userId)
  }

  @Delete(':id')
  async remove(@Param('id') id:string,@Request() req){
    const user = req.user
    return await this.usersService.remove(+id,user.userId)
  }
}
