import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import {
  JwtAuthGuard,
  CurrentUser,
  type AuthUser,
  RolesGuard,
  Roles,
  AUTH_ROLES,
} from '@app/auth';

@Controller({
  version: '1',
})
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: AuthUser) {
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.CUSTOMER)
  @Get('customer-area')
  customerArea(@CurrentUser() user: AuthUser) {
    return {
      message: 'Welcome customer',
      user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AUTH_ROLES.ADMIN)
  @Get('admin-area')
  adminArea(@CurrentUser() user: AuthUser) {
    return {
      message: 'Welcome admin',
      user,
    };
  }
}
