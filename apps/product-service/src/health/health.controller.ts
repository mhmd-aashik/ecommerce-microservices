import { Controller, Get } from '@nestjs/common';
import { DatabaseHealthService } from '@app/database';

@Controller('health')
export class HealthController {
  constructor(private readonly databaseHealthService: DatabaseHealthService) {}

  @Get()
  async check() {
    const database = await this.databaseHealthService.check();

    return {
      service: 'product-service',
      status: 'UP',
      ...database,
      timestamp: new Date().toISOString(),
    };
  }
}
