import { Module } from '@nestjs/common';
import { ImporttransactionService } from './importtransaction.service';
import { ImporttransactionController } from './importtransaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Importtransaction } from './entities/importtransaction.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Importtransaction])],
  controllers: [ImporttransactionController],
  providers: [ImporttransactionService]
})
export class ImporttransactionModule {}
