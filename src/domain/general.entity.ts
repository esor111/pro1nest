import { Column } from "typeorm";
import { Base } from "./base.entity";

export abstract class GeneralInformation extends Base{
   @Column('varchar', {length: 200, nullable: true})
   public name: String;

   @Column('varchar', { unique: true, length: 75, nullable: true })
   public email: string;


  @Column('varchar', { unique: true, length: 15 })
  public contact: string;

  @Column('varchar', { length: 200, nullable: true })
  public avatar: string;
}  