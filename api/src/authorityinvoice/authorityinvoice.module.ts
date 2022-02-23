import { Module } from '@nestjs/common';
import { AuthorityinvoiceService } from './authorityinvoice.service';
import { AuthorityinvoiceController } from './authorityinvoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorityinvoice } from './entities/authorityinvoice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Authorityinvoice])],
  controllers: [AuthorityinvoiceController],
  providers: [AuthorityinvoiceService]
})
export class AuthorityinvoiceModule {}
