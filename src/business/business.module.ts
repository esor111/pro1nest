import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessEntity } from './entities/business.entity';
import { BusinessUser } from './entities/business-user.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { BusinessRole,  } from './entities/business-role.entity';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { PermissionModule } from 'src/permission/permission.module';
import { RolePermission } from 'src/permission/entities/role.permission.entity';
import { BusinessUserRepository } from './entities/business-user.repository';
import { BusinessUserService } from './business-user.service';

@Module({
  imports:[RoleModule, UserModule, PermissionModule, TypeOrmModule.forFeature([BusinessEntity, BusinessUser,User, BusinessRole, RolePermission, BusinessUserRepository])],
  controllers: [BusinessController],
  providers: [BusinessService,JwtStrategy, BusinessUserRepository, BusinessUserService],
  exports:[BusinessService, BusinessUserRepository, BusinessUserService]
})
export class BusinessModule {}