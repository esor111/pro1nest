import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { addpermissionToRoleDto } from 'src/business/dto/create-business.dto';

@ApiTags("permission")
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post("/roleid")
  create( @Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @ApiQuery({
    name: 'ids',
    type: addpermissionToRoleDto,
    explode: false,
    isArray: true,
  })
  @Post('rolepermission/:roleId')
  async addpermissiontoRole(@Query() addpermission: addpermissionToRoleDto, @Query('roleId')roleid: number) {
    return this.permissionService.addpermissiontoRole(addpermission.ids, roleid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
