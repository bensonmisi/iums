import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { HelperService } from 'src/helper/helper.service';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor( 
    @InjectRepository(Account) private readonly accountRepository:Repository<Account>,
    @InjectRepository(User) private readonly userRepository:Repository<User>,
     private readonly helperService:HelperService,
     private readonly mailService:MailService,
     private jwtservice:JwtService
     ){}
    async register(registerDto:RegisterDto){
        
         const accounts = await Account.find();
           const check = await this.helperService.checkCompanyName(accounts,registerDto.company)
           if(check){
               const checkuser = await this.userRepository.findOne({where:{email:registerDto.email},relations:['account']})
               if(checkuser){
                   throw new HttpException("Email already registered with: "+checkuser.account.name,HttpStatus.BAD_REQUEST)
               }
              
              const {company,suppliertypeId,district,province,country,city,...userdata} = registerDto
              const locality = country.toUpperCase()=='ZIMBABWE' ? 'local' : 'FOREIGN'
              const createAccountDto = {name:company,suppliertypeId:suppliertypeId,locality:locality,district:district,province:province,country:country,city}
              const created = await this.accountRepository.create(createAccountDto)
              const save = await this.accountRepository.save(created)
              const regnumber = await this.helperService.generateRegistrationNumber(save.id)
              save.regnumber = regnumber
              await save.save()
             
             userdata.accountId = save.id
             userdata.password = await bcrypt.hash(userdata.password,10) 
             await this.userRepository.save(userdata)
            return {"status":"success","message":"Account successfully created"}

           }
           throw new HttpException("Organisation name already in our database",HttpStatus.BAD_REQUEST)

    }

    async validate(loginDto:LoginDto){
        const {email,password} = loginDto
       const user = await User.findOne({where:{email:email}})
       if(user){
         if(!(await user.validatepassword(password))){
            throw new UnauthorizedException("Invalid Login Details")
         }
         return user
       }
       throw new UnauthorizedException("Invalid Login Details")


    }

    async login(loginDto:LoginDto){
    const user = await this.validate(loginDto)
    const payload = {
        userId:user.id,
        roleId:user.roleId,
        level:'BIDDER'
    }

    return {
        access_token:this.jwtservice.sign(payload)
    }
    }
}
