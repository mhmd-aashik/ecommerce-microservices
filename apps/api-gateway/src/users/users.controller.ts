import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AddUserAddressDto } from './dto/add-user-address.dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUserProfile(@Body() body: CreateUserProfileDto) {
    return this.usersService.createUserProfile(body);
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get('keycloak/:keycloakUserId')
  findUserByKeycloakId(@Param('keycloakUserId') keycloakUserId: string) {
    return this.usersService.findUserByKeycloakId(keycloakUserId);
  }

  @Patch(':id')
  updateUserProfile(
    @Param('id') id: string,
    @Body() body: UpdateUserProfileDto,
  ) {
    return this.usersService.updateUserProfile(id, body);
  }

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
