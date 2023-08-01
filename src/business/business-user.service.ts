import { HttpException, Injectable } from '@nestjs/common';
import {
  addUsertoBusinessDto,
  assignRoleDto,
  removebusinessuserDto,
} from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessEntity } from './entities/business.entity';
import { Repository } from 'typeorm';
import { BusinessRole } from './entities/business-role.entity';
import { RoleService } from 'src/role/role.service';
import { BusinessUser } from './entities/business-user.entity';
import { UserService } from 'src/user/user.service';
import { RolePermission } from 'src/permission/entities/role.permission.entity';
import { BusinessUserRepository } from './entities/business-user.repository';
import { BusinessService } from './business.service';
import { In } from 'typeorm';

@Injectable()
export class BusinessUserService {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly businessRepo: Repository<BusinessEntity>,

    @InjectRepository(BusinessRole)
    private readonly businessRoleRepo: Repository<BusinessRole>,
    @InjectRepository(BusinessUser)
    private readonly businessuserRepo: Repository<BusinessUser>,
    @InjectRepository(RolePermission)
    private readonly rolepermissionRepo: Repository<RolePermission>,

    private readonly roleService: RoleService,
    private readonly userservice: UserService,
    private readonly businessuserRepository: BusinessUserRepository,
    private readonly businessService: BusinessService,
  ) {}

  //extract user form JWT

  async addbusinessUser(
    adduser: addUsertoBusinessDto,
    clientId: number,
    userId: number,
  ) {
    const { businessId, rollid } = adduser;
    const user = await this.userservice.findOneById3(userId);
    if (!user) {
      throw new HttpException('user not found', 404);
    }

    const addedBy = await this.userservice.findOneById3(clientId);
    const business = await this.businessRepo.findOne({
      where: { id: businessId },
    });
    if (!business) {
      throw new HttpException('business not found', 404);
    }

    const role = await this.roleService.findOne(rollid);
    if (!role) {
      throw new HttpException('role not found', 404);
    }

    const rolepermission = await this.rolepermissionRepo.findOne({
      where: { role: { id: role.id } },
    });

    if (!rolepermission) {
      throw new HttpException('rolepermission not found', 404);
    }

    const businessuser = await this.businessuserRepo.save({
      business,
      user,
      addedBy: addedBy,
    });

    const businessrole = await this.businessRoleRepo.save({
      rolepermission,
      businessuser,
    });

    return businessuser;
  }

  async finallbusinessUser(): Promise<any> {
    return await this.businessuserRepository.findBusinessUser();
  }

  async assignRole(assignroledto: assignRoleDto): Promise<any> {
    const { userId, businessId, roleId } = assignroledto;
    const user = await this.userservice.findOneById3(userId);
    if (!user) {
      throw new HttpException('user not found', 404);
    }

    const role = await this.roleService.findOne(roleId);
    if (!role) {
      throw new HttpException(`role not found for ${user.name}`, 404);
    }

    const business = await this.businessService.findOneBusinessByid(businessId);
    if (!business) {
      throw new HttpException('business not found', 404);
    }

    //user is alredy associted with the business
    const businessuser = await this.findOne(user.id, business.id);
    if (!businessuser) {
      throw new HttpException('user is not accociated with this business', 404);
    }

    const isuseralredyinrole = this.checkincludeornot(businessuser, role.name);
    if (isuseralredyinrole === role.name) {
      throw new HttpException('user is already assign to this', 409);
    }

    const rolepermission = await this.rolepermissionRepo.findOne({
      where: { role: { id: roleId } },
    });

    if (!rolepermission) {
      throw new HttpException(`given  ${role.name} have no permission`, 409);
    }

    const businessrole = this.businessRoleRepo.create({
      rolepermission,
      businessuser,
    });
    const assignrole = await this.businessRoleRepo.save(businessrole);
    return {
      data: assignrole,
      message: `role has been assign`,
    };
  }

  async findOneBusinessUser(businessId: number, userId: number): Promise<any> {
    return await this.businessuserRepo.findOne({
      where: { business: { id: businessId }, user: { id: userId } },
      relations: ['businessrole.rolepermission.role'],
    });
  }

  findOne(userid: number, businessId: number) {
    return this.businessuserRepository
      .createQueryBuilder('buser')
      .leftJoinAndSelect('buser.user', 'user')
      .leftJoin('buser.business', 'business')
      .leftJoin('buser.businessrole', 'brole')
      .leftJoinAndSelect('brole.rolepermission', 'rolepermission')
      .leftJoinAndSelect('rolepermission.role', 'role')
      .where('user.id =:userid', { userid: userid })
      .andWhere('business.id =:businessid', { businessid: businessId })
      .getOne();
  }

  checkincludeornot(data, name: string) {
    if (!data) {
      return;
    }
    let allroles = [];
    data?.businessrole.map((each) => {
      console.log(each);
      let roleper = each?.rolepermission?.role?.name;
      // if (!roleper) {
      //   throw new HttpException('ohh man what', 404);
      // }
      allroles.push(roleper);
    });
    const isinclude = allroles.find((role) => role === name);
    return isinclude;
  }

  async removeBusinessUser(removeuserdto: removebusinessuserDto): Promise<any> {
    const { userId, businessId } = removeuserdto;
    const user = await this.userservice.findOneById3(userId);
    if (!user) {
      throw new HttpException(`User not found for`, 404);
    }
    const businessuser =
      await this.businessuserRepository.findOneBusinessUserwithRole(
        userId,
        businessId,
      );
    if (!businessuser) {
      throw new HttpException(`business-user not found for`, 404);
    }

    const isSuperadmin = this.checkincludeornot(businessuser, 'super_admin');
    if (isSuperadmin) {
      throw new HttpException('you cannot remove yourself', 409);
    }
    const { id } = businessuser;

    await this.remove(id);
    await this.deleManyBusinessRoles(id);
    return {
      message: `user has been removed from the business`,
    };
  }

  remove(id: number) {
    return this.businessuserRepo.delete(id);
  }

  async deleManyBusinessRoles(buserId: number) {
    return await this.businessRoleRepo.delete({
      businessuser: { id: buserId },
    });
  }

  //  findManyByBusinessIds

  async findManybusinessUser(busineessIdes: number[]) {
    const businessusers = await this.businessuserRepo.find({
      where: { business: { id: In(busineessIdes) } },
    });
    return businessusers;
  }
}
