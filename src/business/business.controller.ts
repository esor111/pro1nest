import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import {
  CreateBusinessDto,
  addUsertoBusinessDto,
  assignRoleDto,
} from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';                             
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtUserDecorator } from 'src/user/user.decorators';
import { BusinessUserService } from './business-user.service';
import { IsBusinessAdmin } from 'src/guard/isAuthorizedToModifyBusinessUser.guards';

@ApiTags('business')
@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
    private readonly businessuserService: BusinessUserService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createBusinessDto: CreateBusinessDto,
    @JwtUserDecorator() user,
  ) {
    return this.businessService.create(createBusinessDto, user.id);
  }

  @Post('adduser/:userid')
  // @ApiBearerAuth()
  // @UseGuards(IsBusinessAdmin)
  // @UseGuards(AuthGuard('jwt'))
  async addbusinessUser(
    @Body() adduser: addUsertoBusinessDto,

    @Param('userid') userId: number,
  ) {
    return this.businessService.addbusinessUser(adduser, 9, userId);
  }


  @Post("main.")
  async finallbusinessUser(){
    return this.businessuserService.finallbusinessUser()
  }

  @Get('businessuser/getone')
  findOneBusinessUser(
    @Query('userid') userId: number,
    @Query('businessid') businessId: number,
  ) {
    return this.businessuserService.findOneBusinessUser(businessId, userId);
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get('businessuser')
  findAllBusinessUser() {
    return this.businessService.finallbusinessUser();
  }

  @Get('businessuser/:id/:businessid')
  findOne(@Param('id') id: number, @Param('businessid') businessId: number) {
    return this.businessuserService.findOne(id, businessId);
  }

  @Post('assign/:roid')
  @ApiBearerAuth()
  @UseGuards(IsBusinessAdmin)
  @UseGuards(AuthGuard('jwt'))
  assignRole(@Body() assignroledto: assignRoleDto) {
    return this.businessuserService.assignRole(assignroledto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(+id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(+id);
  }
}