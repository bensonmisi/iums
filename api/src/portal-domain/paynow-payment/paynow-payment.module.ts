import { Module } from '@nestjs/common';
import { PaynowPaymentService } from './paynow-payment.service';
import { PaynowPaymentController } from './paynow-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onlinepayment } from 'src/onlinepayment/entities/onlinepayment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Onlinepayment])],
  controllers: [PaynowPaymentController],
  providers: [PaynowPaymentService]
})
export class PaynowPaymentModule {}
