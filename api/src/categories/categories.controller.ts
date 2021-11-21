import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HasAccesslevel } from 'src/decorators/hasaccesslevel.decorator';
import { HasPermission } from 'src/decorators/hasPermission.decorator';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';
import { PermissionGuard } from 'src/guards/permission.guard';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('admin/categories')
@UseGuards(JwtAuthGuard,AccessLevelGuard,PermissionGuard)
@HasAccesslevel('ADMIN')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HasPermission('CREATE_CATEGORY')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @HasPermission('GET_CATEGORIES')
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  @HasPermission('GET_CATEGORY')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @HasPermission('UPDATE_CATEGORY')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HasPermission('DELETE_CATEGORY')
 async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(+id);
  }
}
