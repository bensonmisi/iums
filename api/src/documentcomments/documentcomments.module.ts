import { Module } from '@nestjs/common';
import { DocumentcommentsService } from './documentcomments.service';
import { DocumentcommentsController } from './documentcomments.controller';

@Module({
  controllers: [DocumentcommentsController],
  providers: [DocumentcommentsService]
})
export class DocumentcommentsModule {}
