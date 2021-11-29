import { Module } from '@nestjs/common';
import { SuspensereceiptService } from './suspensereceipt.service';
import { SuspensereceiptController } from './suspensereceipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suspensereceipt } from './entities/suspensereceipt.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Suspensereceipt])],
  controllers: [SuspensereceiptController],
  providers: [SuspensereceiptService]
})
export class SuspensereceiptModule {}
