import { HttpException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { addpermissionToRoleDto } from 'src/business/dto/create-business.dto';
import { RolePermission } from './entities/role.permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @InjectRepository(RolePermission)
    private readonly RolepermissionRepo: Repository<RolePermission>,
    private readonly roleService: RoleService,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const createdrole = this.permissionRepo.create({ ...createPermissionDto });
    const savedpermission = await this.permissionRepo.save(createdrole);
    return {
      data: savedpermission,
      message: `successfully created a permission called ${savedpermission.name}`,
    };
  }

  async addpermissiontoRole(ides, roleid: number) {
    const role = await this.roleService.findOne(roleid);
    if (!role) {
      throw new HttpException('role not found', 404);
    }

    const permissions = await this.findAllByides(ides);
    let savedrolepermission = await Promise.all(
      permissions.map(async (permission) => {
        const rolepermission = await this.RolepermissionRepo.save({
          role,
          permission,
        });
        return rolepermission;
      }),
    );

    return savedrolepermission;
  }

  findAllByides(ides) {
    let data = ides;
    if (!Array.isArray(ides)) {
      data = [ides];
    }
    return this.permissionRepo
      .createQueryBuilder('permission')
      .where('permission.id IN(:...id)', { id: data })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
