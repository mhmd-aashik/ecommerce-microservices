import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  AddUserAddressRequest,
  CreateUserProfileRequest,
  SetDefaultAddressRequest,
  UpdateUserProfileRequest,
  UserGrpcService,
} from './user-grpc.interface';

@Injectable()
export class UsersService implements OnModuleInit {
  private userGrpcService: UserGrpcService;

  constructor(@Inject('USER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userGrpcService =
      this.client.getService<UserGrpcService>('UserService');
  }

  createUserProfile(data: CreateUserProfileRequest) {
    return lastValueFrom(this.userGrpcService.createUserProfile(data));
  }

  findUserById(id: string) {
    return lastValueFrom(this.userGrpcService.findUserById({ id }));
  }

  findUserByKeycloakId(keycloakUserId: string) {
    return lastValueFrom(
      this.userGrpcService.findUserByKeycloakId({ keycloakUserId }),
    );
  }

  updateUserProfile(id: string, data: Omit<UpdateUserProfileRequest, 'id'>) {
    return lastValueFrom(
      this.userGrpcService.updateUserProfile({
        id,
        ...data,
      }),
    );
  }

  addUserAddress(data: AddUserAddressRequest) {
    return lastValueFrom(this.userGrpcService.addUserAddress(data));
  }

  findUserAddresses(userId: string) {
    return lastValueFrom(this.userGrpcService.findUserAddresses({ userId }));
  }

  setDefaultAddress(data: SetDefaultAddressRequest) {
    return lastValueFrom(this.userGrpcService.setDefaultAddress(data));
  }
}
