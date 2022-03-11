import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { CreateNoticecategoryDto } from 'src/noticecategory/dto/create-noticecategory.dto';
import { CreateEntityNoticeCategoryDto } from './dto/create-entitynoticecategory.dto';
import { EntitynoticecategoryService } from './entitynoticecategory.service';

@Controller('entity-domain/entitynoticecategory')
@UseGuards(JwtAuthGuard,AccessLevelGuard)
@HasAccesslevel('ENTITY')
export class EntitynoticecategoryController {
  constructor(private readonly entitynoticecategoryService: EntitynoticecategoryService) {}

  @Get(":id")
  async getCategoris(@Param("id") id:string,@Request() req){
    const user = req.user
    return await this.entitynoticecategoryService.getCategories(+id,user.userId)
  }

  @Post()
  async addCategory(@Body() createNoticeCategoryDto:CreateEntityNoticeCategoryDto,@Request() req){
    const user = req.user
    return await this.entitynoticecategoryService.addCategory(createNoticeCategoryDto,user.userId)
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id:string,@Request() req){
    const user = req.user
    return await this.entitynoticecategoryService.deleteCategory(+id,user.userId)
  }

}
