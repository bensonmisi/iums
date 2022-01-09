import { Module } from '@nestjs/common';
import { DocumentcommentsService } from './documentcomments.service';
import { DocumentcommentsController } from './documentcomments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentcomment } from './entities/documentcomment.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[TypeOrmModule.forFeature([Documentcomment]),MailModule,BullModule],
  controllers: [DocumentcommentsController],
  providers: [DocumentcommentsService]
})
export class DocumentcommentsModule {}
