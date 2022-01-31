import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuppliertypeService } from 'src/suppliertype/suppliertype.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,private readonly suppliertypeService:SuppliertypeService){}
    @Post('register')
    async register(@Body() registerDto:RegisterDto){
        return await this.authService.register(registerDto)
    }

    @Get('suppliertypes')
    async gettypes(){
        return await this.suppliertypeService.findAll()
    }

    @Post('login')
    async login(@Body() loginDto:LoginDto){
        return await this.authService.login(loginDto)
    }
}
