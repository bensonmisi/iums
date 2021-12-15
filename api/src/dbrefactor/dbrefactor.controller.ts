import { Controller, Get } from '@nestjs/common';
import { DbrefactorService } from './dbrefactor.service';

@Controller('dbrefactor')
export class DbrefactorController {
    constructor(private dbrefactorService:DbrefactorService){}

     @Get('merge_tenderapplications')
     async tenderapplications(){
        return await this.dbrefactorService.tenderapplications()
     }
}
