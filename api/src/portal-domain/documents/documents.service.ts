import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Accountdocument } from 'src/accountdocuments/entities/accountdocument.entity';
import { HelperService } from 'src/helper/helper.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DocumentsService {
    constructor(private readonly helperService:HelperService){
        
    }
    
    async findAll(userId:number){
        const user = await User.findOne({where:{id:userId},relations:['account']})
        return await this.helperService.accountdocuments(user.account)
    }

    async uploadDocument(formdata:any,userId:number){
        try {
            const user = await User.findOne({where:{id:userId},relations:['account']})
            const el ={accountId:user.accountId,documentId:formdata.id,path:formdata.filename}
             const record =   await Accountdocument.create(el)
             await Accountdocument.save(record)
             return {"status":"success",'message':'Successfully uploaded document'}
        } catch (error) {
            let message = error.sqlMessage ? error.sqlMessage : error.message
           throw new HttpException(message,HttpStatus.BAD_REQUEST)  
        }
      


    }
}
