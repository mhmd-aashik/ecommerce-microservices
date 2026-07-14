import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { createGrpcClientOptions, INVENTORY_PACKAGE } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: INVENTORY_PACKAGE,
        ...createGrpcClientOptions({
          packageName: 'inventory',
          protoPath: 'proto/inventory/inventory.proto',
          url: process.env.INVENTORY_GRPC_URL || 'localhost:50053',
        }),
      },
    ]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
