import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { SuppliertypeService } from 'src/suppliertype/suppliertype.service';
import { Suppliertype } from 'src/suppliertype/entities/suppliertype.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    TypeOrmModule.forFeature([Account,User,Suppliertype]),MailModule,BullModule],
  providers: [AuthService,SuppliertypeService],
  controllers: [AuthController]
})
export class AuthModule {}
