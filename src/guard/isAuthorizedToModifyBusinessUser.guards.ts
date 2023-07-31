import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BusinessUserService } from 'src/business/business-user.service';
import { BusinessService } from 'src/business/business.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class IsBusinessAdmin implements CanActivate {
  constructor(
    private readonly businessService: BusinessService,
    private readonly roleservice: RoleService,
    private readonly businessuserservice: BusinessUserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const { body, user } = request;
    const { businessId, roleId } = body;
    const business = await this.businessService.findOneBusinessByid(businessId);

    if (!business) {
      throw new HttpException('business not found', 404);
    }
    const role = await this.roleservice.findOne(roleId);
    if (!role) {
      throw new HttpException(`role not found for`, 404);
    }
    const businessuser = await this.businessuserservice.findOne(
      user.id,
      businessId,
    );
    if(!businessuser){
      throw new HttpException(`business-user not found for`, 404);
    }
    // const isuserBusinesadmin=

    return true;
  }
}
