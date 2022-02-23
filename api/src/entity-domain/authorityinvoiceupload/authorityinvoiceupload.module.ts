import { Module } from '@nestjs/common';
import { AuthorityinvoiceuploadService } from './authorityinvoiceupload.service';
import { AuthorityinvoiceuploadController } from './authorityinvoiceupload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorityinvoiceupload } from './entities/authorityinvoiceupload.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Authorityinvoiceupload])],
  controllers: [AuthorityinvoiceuploadController],
  providers: [AuthorityinvoiceuploadService]
})
export class AuthorityinvoiceuploadModule {}
