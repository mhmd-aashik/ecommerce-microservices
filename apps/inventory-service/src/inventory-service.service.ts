import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DRIZZLE_DB } from '@app/database';
import {
  inventoryItems,
  inventoryMovements,
  stockReservations,
  warehouses,
} from './db/schema';
import type { InventoryDatabase } from './db';

@Injectable()
export class InventoryServiceService {
  constructor(
    @Inject(DRIZZLE_DB)
    private readonly db: InventoryDatabase,
  ) {}

  async createWarehouse(data: {
    name: string;
    code: string;
    address?: string;
  }) {
    const [existing] = await this.db
      .select()
      .from(warehouses)
      .where(eq(warehouses.code, data.code));

    if (existing) {
      throw new ConflictException('Warehouse code already exists');
    }

    const [warehouse] = await this.db
      .insert(warehouses)
      .values(data)
      .returning();

    return warehouse;
  }

  async createInventoryItem(data: {
    productId: string;
    warehouseId: string;
    quantityOnHand: number;
    reorderLevel?: number;
  }) {
    const [existing] = await this.db
      .select()
      .from(inventoryItems)
      .where(
        and(
          eq(inventoryItems.productId, data.productId),
          eq(inventoryItems.warehouseId, data.warehouseId),
        ),
      );

    if (existing) {
      throw new ConflictException('Inventory item already exists');
    }

    const [item] = await this.db
      .insert(inventoryItems)
      .values({
        productId: data.productId,
        warehouseId: data.warehouseId,
        quantityOnHand: data.quantityOnHand,
        reorderLevel: data.reorderLevel ?? 0,
      })
      .returning();

    return this.toInventoryItemResponse(item);
  }

  async getInventoryItem(data: { productId: string; warehouseId: string }) {
    const item = await this.findInventoryItem(data.productId, data.warehouseId);

    return this.toInventoryItemResponse(item);
  }

  async getAvailableStock(data: { productId: string; warehouseId: string }) {
    const item = await this.findInventoryItem(data.productId, data.warehouseId);

    return {
      productId: item.productId,
      warehouseId: item.warehouseId,
      availableStock: item.quantityOnHand - item.quantityReserved,
    };
  }

  async increaseStock(data: {
    productId: string;
    warehouseId: string;
    quantity: number;
    reason?: string;
  }) {
    const item = await this.findInventoryItem(data.productId, data.warehouseId);

    const [updated] = await this.db
      .update(inventoryItems)
      .set({
        quantityOnHand: item.quantityOnHand + data.quantity,
        updatedAt: new Date(),
      })
      .where(eq(inventoryItems.id, item.id))
      .returning();

    await this.createMovement(
      updated.id,
      'stock_in',
      data.quantity,
      data.reason,
    );

    return this.toInventoryItemResponse(updated);
  }

  async decreaseStock(data: {
    productId: string;
    warehouseId: string;
    quantity: number;
    reason?: string;
  }) {
    const item = await this.findInventoryItem(data.productId, data.warehouseId);
    const availableStock = item.quantityOnHand - item.quantityReserved;

    if (availableStock < data.quantity) {
      throw new ConflictException('Not enough available stock');
    }

    const [updated] = await this.db
      .update(inventoryItems)
      .set({
        quantityOnHand: item.quantityOnHand - data.quantity,
        updatedAt: new Date(),
      })
      .where(eq(inventoryItems.id, item.id))
      .returning();

    await this.createMovement(
      updated.id,
      'stock_out',
      data.quantity,
      data.reason,
    );

    return this.toInventoryItemResponse(updated);
  }

  async reserveStock(data: {
    productId: string;
    warehouseId: string;
    orderId: string;
    quantity: number;
  }) {
    const item = await this.findInventoryItem(data.productId, data.warehouseId);
    const availableStock = item.quantityOnHand - item.quantityReserved;

    if (availableStock < data.quantity) {
      throw new ConflictException('Not enough stock to reserve');
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const [reservation] = await this.db
      .insert(stockReservations)
      .values({
        inventoryItemId: item.id,
        orderId: data.orderId,
        quantity: data.quantity,
        expiresAt,
      })
      .returning();

    await this.db
      .update(inventoryItems)
      .set({
        quantityReserved: item.quantityReserved + data.quantity,
        updatedAt: new Date(),
      })
      .where(eq(inventoryItems.id, item.id));

    await this.createMovement(
      item.id,
      'reservation_created',
      data.quantity,
      'Stock reserved for order',
      data.orderId,
    );

    return reservation;
  }

  async releaseStock(data: { reservationId: string }) {
    const reservation = await this.findReservation(data.reservationId);

    if (reservation.status !== 'active') {
      throw new ConflictException('Reservation is not active');
    }

    const [item] = await this.db
      .select()
      .from(inventoryItems)
      .where(eq(inventoryItems.id, reservation.inventoryItemId));

    if (!item) {
      throw new NotFoundException('Inventory item not found');
    }

    const [updatedReservation] = await this.db
      .update(stockReservations)
      .set({
        status: 'released',
        updatedAt: new Date(),
      })
      .where(eq(stockReservations.id, reservation.id))
      .returning();

    await this.db
      .update(inventoryItems)
      .set({
        quantityReserved: item.quantityReserved - reservation.quantity,
        updatedAt: new Date(),
      })
      .where(eq(inventoryItems.id, item.id));

    await this.createMovement(
      item.id,
      'reservation_released',
      reservation.quantity,
      'Reservation released',
      reservation.orderId,
    );

    return updatedReservation;
  }

  async confirmStock(data: { reservationId: string }) {
    const reservation = await this.findReservation(data.reservationId);

    if (reservation.status !== 'active') {
      throw new ConflictException('Reservation is not active');
    }

    const [item] = await this.db
      .select()
      .from(inventoryItems)
      .where(eq(inventoryItems.id, reservation.inventoryItemId));

    if (!item) {
      throw new NotFoundException('Inventory item not found');
    }

    const [updatedReservation] = await this.db
      .update(stockReservations)
      .set({
        status: 'confirmed',
        updatedAt: new Date(),
      })
      .where(eq(stockReservations.id, reservation.id))
      .returning();

    await this.db
      .update(inventoryItems)
      .set({
        quantityOnHand: item.quantityOnHand - reservation.quantity,
        quantityReserved: item.quantityReserved - reservation.quantity,
        updatedAt: new Date(),
      })
      .where(eq(inventoryItems.id, item.id));

    await this.createMovement(
      item.id,
      'reservation_confirmed',
      reservation.quantity,
      'Reservation confirmed',
      reservation.orderId,
    );

    return updatedReservation;
  }

  private async findInventoryItem(productId: string, warehouseId: string) {
    const [item] = await this.db
      .select()
      .from(inventoryItems)
      .where(
        and(
          eq(inventoryItems.productId, productId),
          eq(inventoryItems.warehouseId, warehouseId),
        ),
      );

    if (!item) {
      throw new NotFoundException('Inventory item not found');
    }

    return item;
  }

  private async findReservation(reservationId: string) {
    const [reservation] = await this.db
      .select()
      .from(stockReservations)
      .where(eq(stockReservations.id, reservationId));

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return reservation;
  }

  private async createMovement(
    inventoryItemId: string,
    type:
      | 'stock_in'
      | 'stock_out'
      | 'reservation_created'
      | 'reservation_released'
      | 'reservation_confirmed'
      | 'adjustment',
    quantity: number,
    reason?: string,
    referenceId?: string,
  ) {
    await this.db.insert(inventoryMovements).values({
      inventoryItemId,
      type,
      quantity,
      reason,
      referenceId,
    });
  }

  private toInventoryItemResponse(item: {
    id: string;
    productId: string;
    warehouseId: string;
    quantityOnHand: number;
    quantityReserved: number;
    reorderLevel: number;
  }) {
    return {
      ...item,
      availableStock: item.quantityOnHand - item.quantityReserved,
    };
  }
}
