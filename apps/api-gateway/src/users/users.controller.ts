import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AddUserAddressDto } from './dto/add-user-address.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createUserProfile(@Body() body: CreateUserProfileDto) {
    return this.usersService.createUserProfile(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'support')
  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get('keycloak/:keycloakUserId')
  findUserByKeycloakId(@Param('keycloakUserId') keycloakUserId: string) {
    return this.usersService.findUserByKeycloakId(keycloakUserId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  updateUserProfile(
    @Param('id') id: string,
    @Body() body: UpdateUserProfileDto,
  ) {
    return this.usersService.updateUserProfile(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer', 'admin')
  @Post('addresses')
  addUserAddress(@Body() body: AddUserAddressDto) {
    return this.usersService.addUserAddress(body);
  }

  @Get(':id/addresses')
  findUserAddresses(@Param('id') userId: string) {
    return this.usersService.findUserAddresses(userId);
  }

  @Patch(':userId/addresses/:addressId/default')
  setDefaultAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ) {
    return this.usersService.setDefaultAddress({ userId, addressId });
  }
}
