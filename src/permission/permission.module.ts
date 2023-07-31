import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { RoleModule } from 'src/role/role.module';
import { RolePermission } from './entities/role.permission.entity';

@Module({
  imports:[RoleModule, TypeOrmModule.forFeature([Permission, RolePermission])],
  controllers: [PermissionController],
  providers: [PermissionService],
  exports:[PermissionService]
})
export class PermissionModule {}