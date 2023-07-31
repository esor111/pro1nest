import { Base } from 'src/domain/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BusinessUser } from './business-user.entity';

@Entity()
export class BusinessEntity extends Base {
  @Column('varchar', { length: 200 })
  public name: string;

  @Column('varchar', { length: 75, nullable: true })
  public email: string;

  @Column('varchar', { length: 15 })
  public contact: string;

  @Column('varchar', { length: 250, nullable: false })
  public address: string;

  @Column('text', { nullable: true })
  public description: string;

  @Column('boolean', { default: true, nullable: true })
  public available: boolean;

  @Column('text', { nullable: true, name: 'avatar' })
  public avatar: string;

  @Column('jsonb', { nullable: true, default: [] })
  public gallery: string[];

  @OneToMany(() => BusinessUser, (businessuser) => businessuser.business)
  public businessuser: BusinessUser;

}