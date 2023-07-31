import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class Base extends BaseEntity{
   @PrimaryGeneratedColumn('increment')
   public id: number;
   
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt?: Date;


  @DeleteDateColumn({ nullable: true, select: false, name: 'deleted_at' })
  deletedAt?: Date;

}