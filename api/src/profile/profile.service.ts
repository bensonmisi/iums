import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdministratorService } from 'src/administrator/administrator.service';
import { changepasswordDto } from './changepassword.dto';
import { personalDto } from './personal.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class ProfileService {
    constructor(private readonly administratorService:AdministratorService){}

    async updatePersonalData(personalDto:personalDto,id:number):Promise<any>{
        try{
        const user = await this.administratorService.update(id,personalDto)
        return {'status':'success','message':'Personal Information Successfully Changed'}
        }
        catch(error){
            throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
        }

    }

    async changePassword(changepasswordDto:changepasswordDto,id:number){
        try {
            const {password} = changepasswordDto
            const user = await this.administratorService.findOne(id)
            user.password = await bcrypt.hash(password,10)
            user.passwordChange="Y"
            await user.save() 
        } catch (error) {
            throw new HttpException(error.sqlMessage,HttpStatus.BAD_REQUEST)
        }
    }
}
