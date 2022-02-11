import { Controller, Get, Param } from '@nestjs/common';
import { RegisteredsuppliersService } from './registeredsuppliers.service';

@Controller('registeredsuppliers')
export class RegisteredsuppliersController {
  constructor(private readonly registeredsuppliersService: RegisteredsuppliersService) {}

  @Get()
  async findAll(){
    return await this.registeredsuppliersService.findAll()
  }

  @Get(":id")
  async find(@Param('id') id:string){
    return await this.registeredsuppliersService.find(+id)
  }
}
