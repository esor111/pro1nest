import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateBusinessDto,
  addUsertoBusinessDto,
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

@Injectable()
export class BusinessService {
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
    private readonly businessuserRepository:BusinessUserRepository
  ) {}

  //extract user form JWT
  async create(createBusinessDto: CreateBusinessDto, userId) {
    const user = await this.userservice.findOneById3(userId);
    const role = await this.roleService.findAdmin();
    if (!role) {
      throw new HttpException('role not found', 404);
    }
    let createdbusiness = this.businessRepo.create(createBusinessDto);
    let business = await this.businessRepo.save(createdbusiness);

    let businessuser = await this.businessuserRepo.save({ business, user });

    await this.businessRoleRepo.save({ role, businessuser });

    return this.businessRepo.findOne({
      where: { id: business.id },
    });
  }

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

async finallbusinessUser():Promise<any>{
 const data = await this.businessuserRepository.findBusinessUser()
 return data
}

async findOneBusinessByid(businessId: number): Promise<any>{
return await this.businessRepo.findOne({where:{id:businessId}})
}

  findAll() {
    return this.businessRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, updateBusinessDto: UpdateBusinessDto) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} businefsddf ss`;
  }

  removss(id: number) {
    return `This action removes a #${id} business`;
  }
}
