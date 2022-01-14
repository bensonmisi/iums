import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenderinvoiceService } from './tenderinvoice.service';
import { CreateTenderinvoiceDto } from './dto/create-tenderinvoice.dto';
import { UpdateTenderinvoiceDto } from './dto/update-tenderinvoice.dto';
import { Tenderinvoice } from './entities/tenderinvoice.entity';

@Controller('tenderinvoice')
export class TenderinvoiceController {
  constructor(private readonly tenderinvoiceService: TenderinvoiceService) {}

  @Post()
  create(@Body() createTenderinvoiceDto: CreateTenderinvoiceDto) {
    return this.tenderinvoiceService.create(createTenderinvoiceDto);
  }

  @Get()
  async findAll():Promise<Tenderinvoice> {
    return this.tenderinvoiceService.findAll();
  }
 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenderinvoiceService.findOne(+id);
  }

  @Get('getInvoiceData/:id')
  async getInvoiceData(@Param('id') id:string):Promise<any>{
    return await this.tenderinvoiceService.getInvoiceData(+id)
  }
  @Get('/data/invoices/allcontracts')
  async allcontracts():Promise<Tenderinvoice> {
    return this.tenderinvoiceService.Allcontracts();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenderinvoiceDto: UpdateTenderinvoiceDto) {
    return this.tenderinvoiceService.update(+id, updateTenderinvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenderinvoiceService.remove(+id);
  }
}
