import { Role } from "src/role/entities/role.entity";
import { Entity, ManyToOne } from "typeorm";
import { Permission } from "./permission.entity";
import { Base } from "src/domain/base.entity";

@Entity()
export class RolePermission extends Base{
@ManyToOne(()=> Role)
role: Role

@ManyToOne(()=>Permission)
permission: Permission
}