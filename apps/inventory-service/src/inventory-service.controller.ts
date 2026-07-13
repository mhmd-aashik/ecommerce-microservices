import { Controller } from '@nestjs/common';
import { InventoryServiceService } from './inventory-service.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class InventoryServiceController {
  constructor(private readonly inventoryService: InventoryServiceService) {}

  @GrpcMethod('InventoryService', 'CreateWarehouse')
  createWarehouse(data: { name: string; code: string; address?: string }) {
    return this.inventoryService.createWarehouse(data);
  }

  @GrpcMethod('InventoryService', 'CreateInventoryItem')
  createInventoryItem(data: {
    productId: string;
    warehouseId: string;
    quantityOnHand: number;
    reorderLevel?: number;
  }) {
    return this.inventoryService.createInventoryItem(data);
  }

  @GrpcMethod('InventoryService', 'GetInventoryItem')
  getInventoryItem(data: { productId: string; warehouseId: string }) {
    return this.inventoryService.getInventoryItem(data);
  }

  @GrpcMethod('InventoryService', 'GetAvailableStock')
  getAvailableStock(data: { productId: string; warehouseId: string }) {
    return this.inventoryService.getAvailableStock(data);
  }

  @GrpcMethod('InventoryService', 'IncreaseStock')
  increaseStock(data: {
    productId: string;
    warehouseId: string;
    quantity: number;
    reason?: string;
  }) {
    return this.inventoryService.increaseStock(data);
  }

  @GrpcMethod('InventoryService', 'DecreaseStock')
  decreaseStock(data: {
    productId: string;
    warehouseId: string;
    quantity: number;
    reason?: string;
  }) {
    return this.inventoryService.decreaseStock(data);
  }

  @GrpcMethod('InventoryService', 'ReserveStock')
  reserveStock(data: {
    productId: string;
    warehouseId: string;
    orderId: string;
    quantity: number;
  }) {
    return this.inventoryService.reserveStock(data);
  }

  @GrpcMethod('InventoryService', 'ReleaseStock')
  releaseStock(data: { reservationId: string }) {
    return this.inventoryService.releaseStock(data);
  }

  @GrpcMethod('InventoryService', 'ConfirmStock')
  confirmStock(data: { reservationId: string }) {
    return this.inventoryService.confirmStock(data);
  }
}
