import { Observable } from 'rxjs';

export interface InventoryGrpcService {
  createWarehouse(data: CreateWarehouseRequest): Observable<WarehouseResponse>;
  createInventoryItem(
    data: CreateInventoryItemRequest,
  ): Observable<InventoryItemResponse>;
  getInventoryItem(
    data: GetInventoryItemRequest,
  ): Observable<InventoryItemResponse>;
  getAvailableStock(
    data: GetInventoryItemRequest,
  ): Observable<AvailableStockResponse>;

  increaseStock(data: StockChangeRequest): Observable<InventoryItemResponse>;
  decreaseStock(data: StockChangeRequest): Observable<InventoryItemResponse>;

  reserveStock(data: ReserveStockRequest): Observable<StockReservationResponse>;
  releaseStock(data: ReservationRequest): Observable<StockReservationResponse>;
  confirmStock(data: ReservationRequest): Observable<StockReservationResponse>;
}

export interface CreateWarehouseRequest {
  name: string;
  code: string;
  address?: string;
}

export interface WarehouseResponse {
  id: string;
  name: string;
  code: string;
  address?: string;
  isActive: boolean;
}

export interface CreateInventoryItemRequest {
  productId: string;
  warehouseId: string;
  quantityOnHand: number;
  reorderLevel?: number;
}

export interface GetInventoryItemRequest {
  productId: string;
  warehouseId: string;
}

export interface InventoryItemResponse {
  id: string;
  productId: string;
  warehouseId: string;
  quantityOnHand: number;
  quantityReserved: number;
  availableStock: number;
  reorderLevel: number;
}

export interface AvailableStockResponse {
  productId: string;
  warehouseId: string;
  availableStock: number;
}

export interface StockChangeRequest {
  productId: string;
  warehouseId: string;
  quantity: number;
  reason?: string;
}

export interface ReserveStockRequest {
  productId: string;
  warehouseId: string;
  orderId: string;
  quantity: number;
}

export interface ReservationRequest {
  reservationId: string;
}

export interface StockReservationResponse {
  id: string;
  inventoryItemId: string;
  orderId: string;
  quantity: number;
  status: string;
}
