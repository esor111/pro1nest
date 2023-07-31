import { HttpException, Injectable } from '@nestjs/common';
import {registerUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async registerUser(user: registerUserDto, pass: string): Promise<any> {
    let newUser = this.userRepo.create({ ...user, password: pass });
    return await this.userRepo.save(newUser);
  }

  public async findOneById3(userId: number) {
    return this.userRepo.findOne({ where: { id: userId } });
  }

  public async findOneByemail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException(`user not found for this email ${email}`, 404);
    }
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
