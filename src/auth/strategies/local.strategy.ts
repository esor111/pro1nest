// import { Strategy } from 'passport-local';
// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(
//     contact: string,
//     password: string,
//     web: boolean,
//   ): Promise<any> {
//     const user = await this.authService.validateUser({
//       contact,
//       password,
//       web,
//     });

//     if (!user) throw new UnauthorizedException('Invalid user credentials');
//     return user;
//   }
// }