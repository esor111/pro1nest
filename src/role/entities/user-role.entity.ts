import { Base } from "src/domain/base.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Role } from "./role.entity";

@Entity({name: "user_role"})
export class UserRole extends Base{

 @Column()
 public name: string 

 @Column()
 public description: string

 @Column()
 public isActive:Boolean

 @ManyToOne(()=> User, user=> user.userrole)
 public user:User;

 @ManyToOne(()=>Role)
 public role: Role
}