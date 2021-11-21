import { Module } from '@nestjs/common';
import { ExchangerateService } from './exchangerate.service';
import { ExchangerateController } from './exchangerate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exchangerate } from './entities/exchangerate.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Exchangerate])],
  controllers: [ExchangerateController],
  providers: [ExchangerateService]
})
export class ExchangerateModule {}
