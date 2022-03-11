import { MailerService } from "@nestjs-modules/mailer";
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { Administrator } from "src/administrator/entities/administrator.entity";
import { EntityUser } from "src/entity-domain/entity-user/entities/entity-user.entity";

@Processor('emailnotification')
export class MailProcessor{  
    private readonly logger = new Logger(MailProcessor.name)
    constructor(
        private readonly mailerService: MailerService,
      ) {}

      @OnQueueActive()
      onActive(job:Job){
      this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`)
      }

      @OnQueueCompleted()
      onCompleted(job:Job,result:any){
        this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`)
      }

      @OnQueueFailed()
      onError(job: Job<any>, error: any) {
        this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack)
      }

      @Process('PasswordReset')
      async sendWelcomeEmail(job: Job<{ user: Administrator, url: string }>): Promise<any> {
        this.logger.log(`Sending password- reset email to '${job.data.user.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.user.email,
                subject: 'Account Password Reset',
                template: './AdminPasswordReset', 
                context: { 
                  name: job.data.user.name,
                  url:job.data.url,
                },
              }); 

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.user.email}'`, error.stack)
            throw error
        }
      }

      @Process('AdministratorAccountCreation')
      async administratorAccountCreation(job: Job<{ user: Administrator, url: string ,username:string,password:string}>): Promise<any> {
        this.logger.log(`Sending Account Creation email to '${job.data.user.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.user.email,
                subject: 'New Account Creation',
                template: './AdminAccount', 
                context: { 
                  name: job.data.user.name,
                  url:job.data.url,
                  username:job.data.username,
                  password:job.data.password
                },
              }); 

             

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.user.email}'`, error.stack)
            throw error
        }
      }

      @Process('UserAccountCreation')
      async userAccountCreation(job: Job<{ user: Administrator, url: string ,username:string,password:string}>): Promise<any> {
        this.logger.log(`Sending Account Creation email to '${job.data.user.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.user.email,
                subject: 'New Account Creation',
                template: './UserAccount', 
                context: { 
                  name: job.data.user.name,
                  url:job.data.url,
                  username:job.data.username,
                  password:job.data.password
                },
              }); 

             

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.user.email}'`, error.stack)
            throw error
        }
      }

      
      @Process('SendApplicationUpdate')
      async SendApplicationUpdate(job: Job<{ user: EntityUser, message: string }>): Promise<any> {
        this.logger.log(`Sending Account Creation email to '${job.data.user.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.user.email,
                subject: 'Application To Conduct Procurement',
                template: './authority', 
                context: { 
                  message: job.data.message
                },
              }); 

             

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.user.email}'`, error.stack)
            throw error
        }
      }

      @Process('UserEntityAccountCreation')
      async userEntityAccountCreation(job: Job<{ user: EntityUser, url: string ,username:string,password:string}>): Promise<any> {
        this.logger.log(`Sending Account Creation email to '${job.data.user.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.user.email,
                subject: 'New Account Creation',
                template: './UserAccount', 
                context: { 
                  name: job.data.user.name,
                  url:job.data.url,
                  username:job.data.username,
                  password:job.data.password
                },
              }); 

             

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.user.email}'`, error.stack)
            throw error
        }
      }
      
      @Process('generalNotification')
      async generalNotification(job: Job<{ email: string, url: string ,comment:string}>): Promise<any> {
        this.logger.log(`Sending general notification email to '${job.data.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.email,
                subject: 'PRAZ Notification',
                template: './notification', 
                context: { 
                  comment: job.data.comment,
                  url:job.data.url
                },
              }); 

             

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.email}'`, error.stack)
            throw error
        }
      }

      @Process('bankdetailNotification')
      async bankdetailNotification(job: Job<{ email: string, url: string }>): Promise<any> {
        this.logger.log(`Sending general notification email to '${job.data.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.email,
                subject: 'Banking Details Required',
                template: './bidderbankdetails', 
                context: { 
                  url:job.data.url
                },
              }); 

             

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.email}'`, error.stack)
            throw error
        }
      }
      @Process('TenderinvoiceSettled')
      async TenderinvoiceSettled(job: Job): Promise<any> {
          this.logger.log(`Sending invoice settled email to '${job.data.email.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.email.email,
                subject: 'Tender Invoice Settled', 
                template: './Invoicesettled', 
                context: { 
                  tendernumber: job.data.email.tendernumber,
                  type:job.data.email.type
                },
              }); 

             

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.email.email}'`, error.stack)
            throw error
        }
      }

      @Process('SupplierinvoiceSettled')
      async SupplierinvoiceSettled(job: Job): Promise<any> {        
        this.logger.log(`Sending invoice settled email to '${job.data.email.email}'`)

        try {
           const result =  await this.mailerService.sendMail({
                to: job.data.email.email,
                subject: 'Supplier Invoice Settled', 
                template: './supplierinvoicesettled',               
              }); 

             

            return result
        } catch (error) {
            this.logger.error(`Failed to send confirmation email to '${job.data.email.email}'`, error.stack)
            throw error
        }
      }


}