import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Procuremententity } from 'src/procuremententity/entities/procuremententity.entity';
import { Repository } from 'typeorm';
import { EntityUser } from '../entity-user/entities/entity-user.entity';
import { EntityLoginDto } from './dto/entity-login.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Procuremententity) private readonly procuremententityRepository:Repository<Procuremententity>,
        @InjectRepository(EntityUser) private readonly entityuserRepository:Repository<EntityUser>,
        private jwtservice:JwtService
    ){}

    async validate(loginDto:EntityLoginDto){
        const user = await EntityUser.findOne({where:{email:loginDto.email}})
        if(!user){
            throw new HttpException('Invalid email or password combination',HttpStatus.BAD_REQUEST)
        }

        const check = await user.validatepassword(loginDto.password)
        if(!check){
            throw new HttpException('Invalid email or password combination',HttpStatus.BAD_REQUEST) 
        }

        return user
    }

    async login(LoginDto:EntityLoginDto){
        const user = await this.validate(LoginDto)
        const payload ={
            userId:user.id,
            roleId:user.roleId,
            level:'ENTITY'
        }
        return {access_token:this.jwtservice.sign(payload)}
    }
}
