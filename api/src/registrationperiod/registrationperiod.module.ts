import { Module } from '@nestjs/common';
import { RegistrationperiodService } from './registrationperiod.service';
import { RegistrationperiodController } from './registrationperiod.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registrationperiod } from './entities/registrationperiod.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Registrationperiod])],
  controllers: [RegistrationperiodController],
  providers: [RegistrationperiodService]
})
export class RegistrationperiodModule {}
