import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdministratorService } from 'src/administrator/administrator.service';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { AdminAuthDto } from './admin-auth.dto';

@Injectable()
export class AdminAuthService {
    constructor(private administratorService:AdministratorService,private jwtservice:JwtService){}

    async Login(adminAuthDto:AdminAuthDto):Promise<any>{
     const user = await this.validate(adminAuthDto)
      const payload={
          userId:user.id,
          roleId:user.roleId,
          level:'ADMIN'
      }
      return{
          access_token:this.jwtservice.sign(payload)
      }
    }

    async getProfile(id:number):Promise<Administrator>{
        return await this.administratorService.showUserById(id)
    }

    async validate(adminAuthDto:AdminAuthDto){
        const {username,password} = adminAuthDto
        const user = await this.administratorService.findByUsername(username)
        if(!user){
            throw new UnauthorizedException()
        }
        if(user.status !=='ACTIVE'){
            throw new  HttpException('Account Not Active',HttpStatus.UNAUTHORIZED)
        }
        if(!(await user?.validatepassword(password)))
        {
            throw new UnauthorizedException('Invalid Login Details') 
        }
        return user
    }
}
