import { BaseEvent } from '../base-event.interface';
import { KAFKA_TOPICS } from '../../topics';

export interface InventoryReservedPayload {
  reservationId: string;
  inventoryItemId: string;
  productId: string;
  warehouseId: string;
  orderId: string;
  quantity: number;
}

export type InventoryReservedEvent = BaseEvent<InventoryReservedPayload>;

export const INVENTORY_RESERVED_EVENT_TYPE = KAFKA_TOPICS.INVENTORY_RESERVED;
