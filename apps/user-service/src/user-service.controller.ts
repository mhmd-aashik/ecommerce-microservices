import { Controller } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserServiceController {
  constructor(private readonly userService: UserServiceService) {}

  @GrpcMethod('UserService', 'CreateUserProfile')
  createUserProfile(data: {
    keycloakUserId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }) {
    return this.userService.createUserProfile(data);
  }

  @GrpcMethod('UserService', 'FindUserById')
  findUserById(data: { id: string }) {
    return this.userService.findUserById(data.id);
  }

  @GrpcMethod('UserService', 'FindUserByKeycloakId')
  findUserByKeycloakId(data: { keycloakUserId: string }) {
    return this.userService.findUserByKeycloakId(data.keycloakUserId);
  }

  @GrpcMethod('UserService', 'UpdateUserProfile')
  updateUserProfile(data: {
    id: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }) {
    return this.userService.updateUserProfile(data);
  }

  @GrpcMethod('UserService', 'AddUserAddress')
  addUserAddress(data: {
    userId: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
  }) {
    return this.userService.addUserAddress(data);
  }

  @GrpcMethod('UserService', 'FindUserAddresses')
  async findUserAddresses(data: { userId: string }) {
    const addresses = await this.userService.findUserAddresses(data.userId);

    return { addresses };
  }

  @GrpcMethod('UserService', 'SetDefaultAddress')
  setDefaultAddress(data: { userId: string; addressId: string }) {
    return this.userService.setDefaultAddress(data);
  }
}
