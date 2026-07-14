import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { createInventoryGrpcClient } from '@app/common';

@Module({
  imports: [ClientsModule.register([createInventoryGrpcClient()])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
