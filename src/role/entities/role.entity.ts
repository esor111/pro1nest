import { Base } from 'src/domain/base.entity';
import { RolePermission } from 'src/permission/entities/role.permission.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Role extends Base {
  @Column('varchar', { nullable: false })
  public name: string;

  @Column('varchar', { nullable: true, length: 300 })
  public description: string;

  @Column('boolean', { nullable: true })
  public isActive: Boolean;

  @OneToMany(() => RolePermission, (rolepermission) => rolepermission.role)
  public rolepermission: RolePermission;
}