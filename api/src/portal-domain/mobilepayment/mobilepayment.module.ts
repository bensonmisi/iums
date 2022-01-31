import { Module } from '@nestjs/common';
import { MobilepaymentService } from './mobilepayment.service';
import { MobilepaymentController } from './mobilepayment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  
  providers: [MobilepaymentService],
  controllers: [MobilepaymentController]
})
export class MobilepaymentModule {}
