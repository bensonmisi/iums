import { Module } from '@nestjs/common';
import { UploadSignatureService } from './upload-signature.service';
import { UploadSignatureController } from './upload-signature.controller';

@Module({
  controllers: [UploadSignatureController],
  providers: [UploadSignatureService]
})
export class UploadSignatureModule {}
