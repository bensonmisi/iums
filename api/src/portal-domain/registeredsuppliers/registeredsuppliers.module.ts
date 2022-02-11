import { Module } from '@nestjs/common';
import { RegisteredsuppliersService } from './registeredsuppliers.service';
import { RegisteredsuppliersController } from './registeredsuppliers.controller';

@Module({
  controllers: [RegisteredsuppliersController],
  providers: [RegisteredsuppliersService]
})
export class RegisteredsuppliersModule {}
