import { ApiProperty } from "@nestjs/swagger"
import { IsNumberString, IsString } from "class-validator"

export class CreatePermissionDto {
   @ApiProperty()
   @IsString()
   name: string

   @ApiProperty()
   @IsNumberString()
   description: string
}