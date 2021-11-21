import { Module } from '@nestjs/common';
import { ManualtransactionService } from './manualtransaction.service';
import { ManualtransactionController } from './manualtransaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manualtransaction } from './entities/manualtransaction.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Manualtransaction])],
  controllers: [ManualtransactionController],
  providers: [ManualtransactionService]
})
export class ManualtransactionModule {}
