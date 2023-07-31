import { Base } from "src/domain/base.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Permission  extends Base{
@Column('varchar')
public name: String;

@Column('varchar')
public description: String;

// @ManyToOne(()=>Role, role=> role.permission)
// public role: Role
}