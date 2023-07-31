import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {}

export class registerUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  public contact: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  public password: string;
}

export class loginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  public password: string;
}