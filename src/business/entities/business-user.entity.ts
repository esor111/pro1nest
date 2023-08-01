import {
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BusinessEntity } from './business.entity';
import { BusinessRole } from './business-role.entity';
import { Base } from 'src/domain/base.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class BusinessUser extends Base {
  @ManyToOne(() => User, (user) => user.businessuser)
  public user: User;

  @ManyToOne(() => BusinessEntity, (business) => business.businessuser)
  public business: BusinessEntity;

  @OneToMany(() => BusinessRole, (businessrole) => businessrole.businessuser, {
    eager: true,
  })
  public businessrole: BusinessRole[];

  @ManyToOne(() => User, {nullable: true})
  public addedBy: User;
}