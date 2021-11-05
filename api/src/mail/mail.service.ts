import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Administrator } from 'src/administrator/entities/administrator.entity';

@Injectable()
export class MailService {
    constructor(private mailerService:MailerService){}
    async SendAdministratorPasswordReset(user:Administrator,token:string){
        const url = process.env.ADMIN_CLIENT_API+ `/resetPassword/${token}`;

        await this.mailerService.sendMail({
          to: user.email,
          subject: 'Account Password Reset',
          template: './AdminPasswordReset', 
          context: { 
            name: user.name,
            url,
          },
        });
    }

    async SendAdministratorPassword(user:Administrator,password:string,username:string){
      const url = process.env.ADMIN_CLIENT_API;

      await this.mailerService.sendMail({
        to: user.email,
        subject: 'New Account Creation',
        template: './AdminAccount', 
        context: { 
          name: user.name,
          url,
          username,
          password,
        },
      });
  }
}
