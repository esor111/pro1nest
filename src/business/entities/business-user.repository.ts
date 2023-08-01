import { Injectable } from '@nestjs/common/decorators';
import { DataSource, Repository } from 'typeorm';
import { BusinessUser } from './business-user.entity';

@Injectable()
export class BusinessUserRepository extends Repository<BusinessUser> {
  constructor(dataSource: DataSource) {
    super(BusinessUser, dataSource.createEntityManager());
  }

  async findBusinessUser(): Promise<BusinessUser[]> {
    return this.createQueryBuilder('buser')
      .leftJoinAndSelect('buser.business', 'business')
      .leftJoinAndSelect('buser.businessrole', 'businessrole')
      .leftJoinAndSelect('buser.user', 'user')
      .leftJoinAndSelect('businessrole.rolepermission', 'rolepermission')
      .leftJoinAndSelect('rolepermission.role', 'role')
      .getMany();
  }

  async findOneBusinessUserwithRole(businessId: number, userId: number) {
    console.log(businessId, userId)
    return this.createQueryBuilder('buser')
      .leftJoinAndSelect('buser.business', 'business')
      .leftJoinAndSelect('buser.businessrole', 'businessrole')
      .leftJoinAndSelect('buser.user', 'user')
      .leftJoinAndSelect('businessrole.rolepermission', 'rolepermission')
      .leftJoinAndSelect('rolepermission.role', 'role')
      .where('business.id =:businessId', { businessId })
      .andWhere('user.id =:userId', { userId })
      .getOne();
  }


async findOneBusinessUser(buserid: number){
  return await this.findOne({where:{id: buserid}})
}

}
