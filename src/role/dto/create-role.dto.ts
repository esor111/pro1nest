import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumberString, IsString } from "class-validator";

export class CreateRoleDto {
   @ApiProperty()
   @IsString()
   name: string

   @ApiProperty()
   @IsNumberString()
   description: string

   @ApiProperty()
   @IsBoolean()
   isActive: Boolean
}