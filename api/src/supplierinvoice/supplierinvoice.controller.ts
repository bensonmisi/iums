import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierinvoiceService } from './supplierinvoice.service';
import { CreateSupplierinvoiceDto } from './dto/create-supplierinvoice.dto';
import { UpdateSupplierinvoiceDto } from './dto/update-supplierinvoice.dto';

@Controller('admin/supplierinvoice')
export class SupplierinvoiceController {
  constructor(private readonly supplierinvoiceService: SupplierinvoiceService) {}

  @Post()
  create(@Body() createSupplierinvoiceDto: CreateSupplierinvoiceDto) {
    return this.supplierinvoiceService.create(createSupplierinvoiceDto);
  }

  @Get()
  async findAll():Promise<any> {
    return await this.supplierinvoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierinvoiceService.findOne(+id);
  }

  @Get('checksettlement/:invoicenumber')
  checksettlement(@Param('invoicenumber') invoicenumber:string){
    return this.supplierinvoiceService.checksettlement(invoicenumber)
  }

  @Get('getInvoiceData/:invoicenumber')
  getInvoiceData(@Param('invoicenumber') invoicenumber:string){
    return this.supplierinvoiceService.getInvoiceData(invoicenumber)
  }


  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierinvoiceDto: UpdateSupplierinvoiceDto) {
    return this.supplierinvoiceService.update(+id, updateSupplierinvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierinvoiceService.remove(+id);
  }
}
