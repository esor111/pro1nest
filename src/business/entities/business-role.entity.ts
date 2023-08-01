import { Base } from 'src/domain/base.entity';
import { Entity,  ManyToOne } from 'typeorm';
import { BusinessUser } from './business-user.entity';
import { RolePermission } from 'src/permission/entities/role.permission.entity';

@Entity()
export class BusinessRole extends Base {
  @ManyToOne(() => BusinessUser, (businessuser) => businessuser.businessrole)
  public businessuser: BusinessUser

  @ManyToOne(()=> RolePermission)
  public rolepermission: RolePermission;
}