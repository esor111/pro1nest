import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const createdrole = this.roleRepository.create(createRoleDto);
    const savedrole = await this.roleRepository.save(createdrole);
    return {
      data: savedrole,
      message: 'successfully created a role',
    };
  }

  async findOne(rolid: number) {
    return this.roleRepository.findOne({ where: { id: rolid } });
  }

  async findRoleByName(name: string) {
    return this.roleRepository.findOne({ where: { name: name } });
  }

  async findAdmin() {
    return this.roleRepository.findOne({ where: { name: 'super_admin' } });
  }

  findAll() {
    return this.roleRepository.find()
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
