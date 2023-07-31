import { Injectable } from '@nestjs/common/decorators';
import { DataSource, Repository } from 'typeorm';
import { BusinessUser } from './business-user.entity';

@Injectable()
export class BusinessUserRepository extends Repository<BusinessUser> {
    constructor(dataSource: DataSource) {
        super(BusinessUser, dataSource.createEntityManager())
    }
  
    async findBusinessUser() :Promise<BusinessUser[]>{
      return (
        this.createQueryBuilder('buser')
        .leftJoinAndSelect('buser.business', 'business')
          .leftJoinAndSelect('buser.businessrole', 'businessrole')
          .leftJoinAndSelect('buser.user', 'user')
          .leftJoinAndSelect('businessrole.rolepermission', 'rolepermission')
          .leftJoinAndSelect('rolepermission.role', 'role')
          .getMany()
      );
    }   
    async findBusinessUserWithRawQuery() :Promise<BusinessUser[]>{
        return this.query(`SELECT bu.*, br.* FROM business_user AS bu 
        LEFT JOIN business_role as br on br."businessuserId"=bu.id LIMIT 1`)
    }  


    // async findOneBusinessUser(businessId:number, userId: number) :Promise<BusinessUser[]>{
    //   return (
    //     this.createQueryBuilder('buser')
    //    .where("buser =:userId", {userId: userId})
    //    .andWhere()
    //   );
    // }   
}