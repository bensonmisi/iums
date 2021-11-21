import { Module } from '@nestjs/common';
import { SuspenseService } from './suspense.service';
import { SuspenseController } from './suspense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suspense } from './entities/suspense.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Suspense])],
  controllers: [SuspenseController],
  providers: [SuspenseService],
  exports:[SuspenseService]
})
export class SuspenseModule {}
