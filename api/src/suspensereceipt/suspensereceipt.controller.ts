import { Controller, Get, Param } from '@nestjs/common';
import { SuspensereceiptService } from './suspensereceipt.service';

@Controller('admin/suspensereceipts')
export class SuspensereceiptController {
  constructor(private readonly suspensereceiptService: SuspensereceiptService) {}

  @Get(':id')
  async findById(@Param('id') id:string){
    return  await this.suspensereceiptService.getById(+id)
  }
}
