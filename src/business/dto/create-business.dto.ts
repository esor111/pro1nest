import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateBusinessDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { length: 200 })
  public name: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @Column('varchar', { length: 75, nullable: true })
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { length: 15 })
  public contact: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column('varchar', { length: 250, nullable: false })
  public address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Column('text', { nullable: true })
  public description: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @Column('boolean', { default: true, nullable: true })
  public available: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Column('text', { nullable: true, name: 'avatar' })
  public avatar: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @Column('jsonb', { nullable: true, default: [] })
  public gallery: string[];
}

export class addUsertoBusinessDto {
  @ApiProperty()
  @IsNumberString()
  businessId: number;

  @ApiProperty()
  public rollid: number;
}

export class addpermissionToRole {
  @ApiProperty()
  public permissionIds: number;
}

export class addpermissionToRoleDto {
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}



export class assignRoleDto{
  @ApiProperty({required: true})
  @IsNumberString()
  userId:number

  @ApiProperty()
  @IsNumberString()
  roleId:number
  
  @ApiProperty()
  @IsNumberString()
  businessId:number
}


export class removebusinessuserDto{
  @ApiProperty({required: true})
  @IsNumberString()
  userId:number
  
  @ApiProperty()
  @IsNumberString()
  businessId:number
}

export class businessIdesDto{
  @ApiProperty()
  @IsArray()
  @IsInt({each: true})
  public businessIdes: number[];
}