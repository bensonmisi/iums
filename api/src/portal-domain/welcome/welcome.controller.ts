import { Controller, Get, Param } from '@nestjs/common';
import { WelcomeService } from './welcome.service';

@Controller('welcome')
export class WelcomeController {
    constructor(private readonly welcomeService:WelcomeService){}

@Get('/procuremententities')

async getEntitylist(){
return await this.welcomeService.getEntitylist()
}

@Get('/awardnotices')
async getAward(){
 return await this.welcomeService.getAwards()
}

@Get("/procurementplan/:id")
async getPlan(@Param('id') id:string){
 return await this.welcomeService.getPlan(+id)
}



}
