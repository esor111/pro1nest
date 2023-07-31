import { Base } from 'src/domain/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Student extends Base {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true, name: 'dateOfBirth' })
  dateOfBirth: Date;

  @Column({ nullable: false })
  address: string;

  @Column({ name: 'phoneNumber' })
  phoneNumber: string;

  @Column({ name: 'enrollmentDate' })
  enrollmentDate: Date;
}