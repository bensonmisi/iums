import { Body, Controller, Post } from '@nestjs/common';
import { BanktransactionService } from 'src/banktransaction/banktransaction.service';
import { PostTransactionDto } from 'src/banktransaction/dto/posttransaction.dto';

@Controller('sendPayment')
export class BankApiController {
    constructor(private banktransactionService:BanktransactionService){}

    @Post()
    async posttransaction(@Body() posttransactionDto:PostTransactionDto):Promise<any>{
        return await this.banktransactionService.create(posttransactionDto)
    }
}
