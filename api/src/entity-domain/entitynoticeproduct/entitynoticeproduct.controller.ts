import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { CreateNoticeProductDto } from './dto/create-noticeproduct.dto';
import { UpdateNoticeProductDto } from './dto/update-noticeproduct.dto';
import { EntitynoticeproductService } from './entitynoticeproduct.service';

@Controller('entity-domain/entitynoticeproduct')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ENTITY')
export class EntitynoticeproductController {
  constructor(private readonly entitynoticeproductService: EntitynoticeproductService) {}

  @Get(":id")
  async getProducts(@Param("id") id:string,@Request() req){
    const user = req.user
   return await this.entitynoticeproductService.getProducts(+id,user.userId)

  }

  @Post()
  async addProduct(@Body() createNoticeProductDto:CreateNoticeProductDto,@Request() req){
    const user = req.user
    return await this.entitynoticeproductService.addProduct(createNoticeProductDto,user.userId)
  }

  @Patch(":id")
  async editProduct(@Param("id") id:string,@Body() updateNoticeProductDto:UpdateNoticeProductDto,@Request() req){
    const user = req.user
    return await this.entitynoticeproductService.editProduct(+id,updateNoticeProductDto,user.userId)
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id:string,@Request() req){
    const user = req.user
    return await this.entitynoticeproductService.deleteProduct(+id,user.userId)
  }
}
