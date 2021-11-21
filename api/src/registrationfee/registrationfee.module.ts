import { Global, Module } from '@nestjs/common';
import { RegistrationfeeService } from './registrationfee.service';
import { RegistrationfeeController } from './registrationfee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registrationfee } from './entities/registrationfee.entity';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([Registrationfee])],
  controllers: [RegistrationfeeController],
  providers: [RegistrationfeeService]
})
export class RegistrationfeeModule {}
