import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  hash } from 'bcrypt';
import { loginDto, registerUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("AUTH")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  create(@Body() registerUserDto: registerUserDto) {
    return this.authService.Signup(registerUserDto)
  }

  @Post("login")
  login(@Body()loginDto: loginDto){
return this.authService.Validateandlogin(loginDto)
  }

}


