import { BaseEvent } from '../base-event.interface';
import { KAFKA_TOPICS } from '../../topics';

export interface InventoryReleasedPayload {
  reservationId: string;
  inventoryItemId: string;
  orderId: string;
  quantity: number;
}

export type InventoryReleasedEvent = BaseEvent<InventoryReleasedPayload>;

export const INVENTORY_RELEASED_EVENT_TYPE = KAFKA_TOPICS.INVENTORY_RELEASED;
