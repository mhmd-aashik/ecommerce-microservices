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
import { CacheService } from '@app/redis';

@Controller({
  version: '1',
})
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    private readonly cacheService: CacheService,
  ) {}

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

  // http://localhost:3000/api/v1/redis-test
  @Get('redis-test')
  async redisTest() {
    await this.cacheService.set('hello', { message: 'Redis works' }, 60);

    return this.cacheService.get('hello');
  }
}
