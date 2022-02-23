import { Module } from '@nestjs/common';
import { UploadCvService } from './upload-cv.service';
import { UploadCvController } from './upload-cv.controller';

@Module({
  controllers: [UploadCvController],
  providers: [UploadCvService]
})
export class UploadCvModule {}
