import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { TendersService } from './tenders.service';

@Controller('bidder/tenders')

export class TendersController {
  constructor(private readonly tendersService: TendersService) {}

  @Get()
  async getAll(){
    return await this.tendersService.getAll()
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid:string){
    return await this.tendersService.findOne(uuid)
  }

  @Get('/download/:uuid')
  async download(@Param('uuid') uuid:string):Promise<StreamableFile>{
     const record = await this.tendersService.download(uuid)
     const file = createReadStream(join(process.cwd(),'public/'+record.filename))
     return new StreamableFile(file)

  }
}
