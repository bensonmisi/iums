import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { AdministratorModule } from './administrator/administrator.module';
import { SubmoduleModule } from './submodule/submodule.module';
import { PermissionModule } from './permission/permission.module';
import { SystemModulesModule } from './system-modules/system-modules.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: "root",
      password: process.env.PASSWORD,
      database: 'iums',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize:true,
    }),
    RoleModule,
    AdministratorModule,
    SubmoduleModule,
    PermissionModule,
    SystemModulesModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
