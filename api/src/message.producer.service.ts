import { InjectQueue } from "@nestjs/bull";
import { Global, Injectable } from "@nestjs/common";
import {Queue} from 'bull'
@Injectable()
@Global()
export class MessageProducerService{
    constructor(@InjectQueue('message-queue') private queue:Queue){}
 async sendMessage(msg:string){
     await this.queue.add('message-job',{
         text:msg
     });
 }
}