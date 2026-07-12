import { Observable } from 'rxjs';

export interface UserGrpcService {
  createUserProfile(data: CreateUserProfileRequest): Observable<UserResponse>;
  findUserById(data: FindUserByIdRequest): Observable<UserResponse>;
  findUserByKeycloakId(
    data: FindUserByKeycloakIdRequest,
  ): Observable<UserResponse>;
  updateUserProfile(data: UpdateUserProfileRequest): Observable<UserResponse>;

  addUserAddress(data: AddUserAddressRequest): Observable<UserAddressResponse>;
  findUserAddresses(
    data: FindUserAddressesRequest,
  ): Observable<UserAddressListResponse>;
  setDefaultAddress(
    data: SetDefaultAddressRequest,
  ): Observable<UserAddressResponse>;
}

export interface CreateUserProfileRequest {
  keycloakUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface FindUserByIdRequest {
  id: string;
}

export interface FindUserByKeycloakIdRequest {
  keycloakUserId: string;
}

export interface UpdateUserProfileRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface UserResponse {
  id: string;
  keycloakUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isActive: boolean;
}

export interface AddUserAddressRequest {
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
}

export interface FindUserAddressesRequest {
  userId: string;
}

export interface SetDefaultAddressRequest {
  userId: string;
  addressId: string;
}

export interface UserAddressResponse {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface UserAddressListResponse {
  addresses: UserAddressResponse[];
}
