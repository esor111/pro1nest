  import { HttpException, Injectable } from '@nestjs/common';
  import { loginDto, registerUserDto } from 'src/user/dto/create-user.dto';
  import { hash, compare } from 'bcrypt';
  import { UserService } from 'src/user/user.service';
  import { User } from 'src/user/entities/user.entity';
  import { JwtService } from '@nestjs/jwt';

  @Injectable()
  export class AuthService {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
    ) {}

    public async Signup(registeruser: registerUserDto): Promise<any> {
      const pass = await this.hashpassword(registeruser.password);
      return await this.userService.registerUser(registeruser, pass);
    }

    public async Validateandlogin(logindto: loginDto) {
      let user = await this.validateUser(logindto);
      //compare password
      const isvalid = await this.comparePass(user.password, logindto.password);
      if (!isvalid) {
        throw new HttpException('Password not valid', 400);
      }

      return await this.login(user)
    }

    public async login(user: User): Promise<any> {
      const { id, email, name } = user;
      const token = await this.generateToken({id, name, email});
      return {
        user, token
      }
    }

    public async validateUser(loginDto: loginDto) {
      const { email } = loginDto;
      const user = await this.userService.findOneByemail(email);
      return user;
    }

    public async generateToken(user: any) {
      return this.jwtService.signAsync(user, {
        secret: 'ishworisbillionire',
      });
    }

    private async comparePass(dbpass: string, userpass: string) {
      return compare(userpass, dbpass);
    }

    public async hashpassword(password: string) {
      return hash(password, 10);
    }
  }
