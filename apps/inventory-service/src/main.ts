import { NestFactory } from '@nestjs/core';
import { InventoryServiceModule } from './inventory-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'inventory',
        protoPath: join(process.cwd(), 'proto/inventory/inventory.proto'),
        url: process.env.INVENTORY_GRPC_URL || 'localhost:50053',
      },
    },
  );

  await app.listen();
  console.log('Inventory gRPC service running on localhost:50053');
}
void bootstrap();
