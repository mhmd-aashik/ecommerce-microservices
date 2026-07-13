import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  CreateInventoryItemRequest,
  CreateWarehouseRequest,
  GetInventoryItemRequest,
  InventoryGrpcService,
  ReservationRequest,
  ReserveStockRequest,
  StockChangeRequest,
} from './inventory-grpc.interface';

@Injectable()
export class InventoryService implements OnModuleInit {
  private inventoryGrpcService: InventoryGrpcService;

  constructor(
    @Inject('INVENTORY_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.inventoryGrpcService =
      this.client.getService<InventoryGrpcService>('InventoryService');
  }

  createWarehouse(data: CreateWarehouseRequest) {
    return lastValueFrom(this.inventoryGrpcService.createWarehouse(data));
  }

  createInventoryItem(data: CreateInventoryItemRequest) {
    return lastValueFrom(this.inventoryGrpcService.createInventoryItem(data));
  }

  getInventoryItem(data: GetInventoryItemRequest) {
    return lastValueFrom(this.inventoryGrpcService.getInventoryItem(data));
  }

  getAvailableStock(data: GetInventoryItemRequest) {
    return lastValueFrom(this.inventoryGrpcService.getAvailableStock(data));
  }

  increaseStock(data: StockChangeRequest) {
    return lastValueFrom(this.inventoryGrpcService.increaseStock(data));
  }

  decreaseStock(data: StockChangeRequest) {
    return lastValueFrom(this.inventoryGrpcService.decreaseStock(data));
  }

  reserveStock(data: ReserveStockRequest) {
    return lastValueFrom(this.inventoryGrpcService.reserveStock(data));
  }

  releaseStock(data: ReservationRequest) {
    return lastValueFrom(this.inventoryGrpcService.releaseStock(data));
  }

  confirmStock(data: ReservationRequest) {
    return lastValueFrom(this.inventoryGrpcService.confirmStock(data));
  }
}
