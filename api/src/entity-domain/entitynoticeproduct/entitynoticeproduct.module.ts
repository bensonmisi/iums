import { Module } from '@nestjs/common';
import { EntitynoticeproductService } from './entitynoticeproduct.service';
import { EntitynoticeproductController } from './entitynoticeproduct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticeproduct } from 'src/noticeproduct/entities/noticeproduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Noticeproduct])],
  controllers: [EntitynoticeproductController],
  providers: [EntitynoticeproductService]
})
export class EntitynoticeproductModule {}
