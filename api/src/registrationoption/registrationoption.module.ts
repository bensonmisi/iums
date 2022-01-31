import { Module } from '@nestjs/common';
import { RegistrationoptionService } from './registrationoption.service';
import { RegistrationoptionController } from './registrationoption.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registrationoption } from './entities/registrationoption.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Registrationoption])],
  controllers: [RegistrationoptionController],
  providers: [RegistrationoptionService]
})
export class RegistrationoptionModule {}
