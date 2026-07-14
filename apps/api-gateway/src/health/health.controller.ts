import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {
  @Get()
  check() {
    return {
      service: 'api-gateway',
      status: 'UP',
      timestamp: new Date().toISOString(),
    };
  }
}
