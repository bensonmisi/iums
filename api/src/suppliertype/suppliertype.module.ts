import { Module } from '@nestjs/common';
import { SuppliertypeService } from './suppliertype.service';
import { SuppliertypeController } from './suppliertype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suppliertype } from './entities/suppliertype.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Suppliertype])],
  controllers: [SuppliertypeController],
  providers: [SuppliertypeService]
})
export class SuppliertypeModule {}
