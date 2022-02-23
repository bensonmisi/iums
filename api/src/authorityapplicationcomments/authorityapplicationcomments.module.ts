import { Module } from '@nestjs/common';
import { AuthorityapplicationcommentsService } from './authorityapplicationcomments.service';
import { AuthorityapplicationcommentsController } from './authorityapplicationcomments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authorityapplicationcomment } from './entities/authorityapplicationcomment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Authorityapplicationcomment])],
  controllers: [AuthorityapplicationcommentsController],
  providers: [AuthorityapplicationcommentsService]
})
export class AuthorityapplicationcommentsModule {}
