import { BaseEvent } from '../base-event.interface';
import { KAFKA_TOPICS } from '../../topics';

export interface OrderCancelledPayload {
  orderId: string;
  userId: string;
  reason: string;
}

export type OrderCancelledEvent = BaseEvent<OrderCancelledPayload>;

export const ORDER_CANCELLED_EVENT_TYPE = KAFKA_TOPICS.ORDER_CANCELLED;
