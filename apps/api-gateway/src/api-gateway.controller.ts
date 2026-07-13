import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import type { AuthUser } from './auth/auth-user.interface';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { RolesGuard } from './auth/guards/roles.guard';

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
  @Roles('customer')
  @Get('customer-area')
  customerArea(@CurrentUser() user: AuthUser) {
    return {
      message: 'Welcome customer',
      user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin-area')
  adminArea(@CurrentUser() user: AuthUser) {
    return {
      message: 'Welcome admin',
      user,
    };
  }
}
