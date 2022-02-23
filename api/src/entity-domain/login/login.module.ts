import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procuremententity } from 'src/procuremententity/entities/procuremententity.entity';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async()=>({
        secret:process.env.JWT_SECRET,
        signOptions: { expiresIn: '6000s' },
      }),
      inject:[ConfigService]
    }),  
    TypeOrmModule.forFeature([Procuremententity,EntityUser]),MailModule,BullModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
