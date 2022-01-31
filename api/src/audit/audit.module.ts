import { Global, Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { audit } from './entities/audit.entity';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([audit])],
  controllers: [AuditController],
  providers: [AuditService],
  exports:[AuditService]
})
export class AuditModule {} 
