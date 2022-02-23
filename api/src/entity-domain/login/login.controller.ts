import { Body, Controller, Post } from '@nestjs/common';
import { EntityLoginDto } from './dto/entity-login.dto';
import { LoginService } from './login.service';

@Controller('entity-domain/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async Login(@Body() loginDto:EntityLoginDto){

    return this.loginService.login(loginDto)
  }
}
