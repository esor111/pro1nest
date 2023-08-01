import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BusinessUserService } from 'src/business/business-user.service';
import { BusinessService } from 'src/business/business.service';
import { BusinessUserRepository } from 'src/business/entities/business-user.repository';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class IsBusinessAdmin implements CanActivate {
  constructor(
    private readonly businessService: BusinessService,
    private readonly roleservice: RoleService,
    private readonly businessuserservice: BusinessUserService,
    private readonly businessuserRepo: BusinessUserRepository,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const { body, user } = request;
    const { businessId } = body;
    const business = await this.businessService.findOneBusinessByid(businessId);

    if (!business) {
      throw new HttpException('business not found', 404);
    }
    // const role = await this.roleservice.findOne(roleId);
    // if (!role) {
    //   throw new HttpException(`role not found for`, 404);
    // }
    const businessuser =
      await this.businessuserRepo.findOneBusinessUserwithRole(businessId, user.id);
    if (businessuser?.businessrole.length === 0) {
      throw new HttpException('business-user role found', 404);
    }

    if (!businessuser) {
      throw new HttpException(`business-user not found for`, 404);
    }
    let isuseralredyinrole = this.businessuserservice.checkincludeornot(
      businessuser,
      'super_admin',
    );

    if (!isuseralredyinrole) {
      throw new HttpException(`you dont have necessary permission`, 400);
    }
    return true;
  }
}
