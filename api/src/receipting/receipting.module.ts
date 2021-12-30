import { Module } from '@nestjs/common';
import { ReceiptingService } from './receipting.service';
import { ReceiptingController } from './receipting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/receipt/entities/receipt.entity';
import { Events } from 'src/events';
import { MessageProducerService } from 'src/message.producer.service';
import { MailService } from 'src/mail/mail.service';
import { BullModule } from '@nestjs/bull';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([Receipt]),MailModule],
  providers: [ReceiptingService,Events],
  controllers: [ReceiptingController],


})
export class ReceiptingModule {}
