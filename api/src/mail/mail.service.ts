import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { config } from 'process';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { EntityUser } from 'src/entity-domain/entity-user/entities/entity-user.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
    constructor(@InjectQueue('emailnotification') private mailQueue:Queue, 
     private readonly mailerService:MailerService){}
    async SendAdministratorPasswordReset(user:Administrator,token:string):Promise<boolean>{
        const url = process.env.ADMIN_CLIENT_API+ `/resetPassword/${token}`;


        try {
           await this.mailQueue.add('PasswordReset',{
             user,
             url
           })
           return true
        } catch (error) {
           console.log(error)
           return false
        }
    }

    async SendAdministratorPassword(user:Administrator,password:string,username:string){
      const url = process.env.ADMIN_CLIENT_API;
      try {
         await this.mailQueue.add('AdministratorAccountCreation',{
           user,
           url,
           username,
           password
         })
      } catch (error) {
        console.log(error)
        return false
      }
     
  }

  async SendUserPassword(user:User,password:string,username:string){
    const url = process.env.CLIENT_API;
    try {
       await this.mailQueue.add('UserAccountCreation',{
         user,
         url,
         username,
         password
       })
    } catch (error) {
      console.log(error)
      return false
    }
   
}

async SendApplicationUpdate(user:EntityUser[],message:string){
  const url = process.env.CLIENT_API;
  try {
     await this.mailQueue.add('UserApplicationUpdate',{
       user,
       message
     })
  } catch (error) {
    console.log(error)
    return false
  }
 
}

async SendEntityUserPassword(user:EntityUser,password:string,username:string){
  const url = process.env.ENTITY_API;
  try {
     await this.mailQueue.add('UserEntityAccountCreation',{
       user,
       url,
       username,
       password
     })
  } catch (error) {
    console.log(error)
    return false
  }
 
}

  async tenderinvoiceSettled(email:string,tendernumber:string,type:string){
    try {
      await this.mailQueue.add('TenderinvoiceSettled',{
        email,
        tendernumber,
        type})
   } catch (error) {
     console.log(error)
     return false
   }
  }

  async supplierinvoiceSettled(email:string){
    try {
      await this.mailQueue.add('SupplierinvoiceSettled',{
        email})
   } catch (error) {
     console.log(error)
     return false
   }
  }

  async generalNotification(email:string,comment:string){
    const url = process.env.CLIENT_API;
    try {
      await this.mailQueue.add('generalNotification',{
        email,url,comment})
   } catch (error) {
     console.log(error)
     return false
   }
  }

  async bankdetailNotification(email:string){
    const url = process.env.CLIENT_API;
    try {
      await this.mailQueue.add('bankdetailNotification',{
        email,url})
   } catch (error) {
     console.log(error)
     return false
   }
  }
}
