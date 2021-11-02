import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { async } from 'rxjs';
import { JwtStrategy } from 'src/jwtsettings/jwt.strategy';
import { AdministratorService } from 'src/administrator/administrator.service';
import { AdministratorModule } from 'src/administrator/administrator.module';
import { JwtAuthGuard } from 'src/jwtsettings/jwt-auth.guard';
import { AccessLevelGuard } from 'src/guards/accesslevel.guard';

@Module({
  imports:[
          AdministratorModule,
          PassportModule,
          JwtModule.registerAsync({
            imports:[ConfigModule],
            useFactory:async()=>({
              secret:process.env.JWT_SECRET,
              signOptions: { expiresIn: '6000s' },
            }),
            inject:[ConfigService]
          })
        ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService,JwtStrategy,JwtAuthGuard,AccessLevelGuard]
})
export class AdminAuthModule {}
