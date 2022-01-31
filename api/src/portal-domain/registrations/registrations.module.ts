import { Module } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationsController } from './registrations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Supplier])],
  providers: [RegistrationsService],
  controllers: [RegistrationsController]
})
export class RegistrationsModule {}
