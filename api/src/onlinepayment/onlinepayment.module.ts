import { Module } from '@nestjs/common';
import { OnlinepaymentService } from './onlinepayment.service';
import { OnlinepaymentController } from './onlinepayment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onlinepayment } from './entities/onlinepayment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Onlinepayment])],
  controllers: [OnlinepaymentController],
  providers: [OnlinepaymentService]
})
export class OnlinepaymentModule {}
