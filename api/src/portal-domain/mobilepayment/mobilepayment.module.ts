import { Module } from '@nestjs/common';
import { MobilepaymentService } from './mobilepayment.service';
import { MobilepaymentController } from './mobilepayment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onlinepayment } from 'src/onlinepayment/entities/onlinepayment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Onlinepayment])],
  providers: [MobilepaymentService],
  controllers: [MobilepaymentController]
})
export class MobilepaymentModule {}
