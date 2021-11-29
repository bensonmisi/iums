import { Module } from '@nestjs/common';
import { SuspensetransfersService } from './suspensetransfers.service';
import { SuspensetransfersController } from './suspensetransfers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suspensetransfer } from './entities/suspensetransfer.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Suspensetransfer])],
  controllers: [SuspensetransfersController],
  providers: [SuspensetransfersService]
})
export class SuspensetransfersModule {}
