import { BaseEvent } from '../base-event.interface';
import { KAFKA_TOPICS } from '../../topics';

export interface OrderCreatedPayload {
  orderId: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: string;
  }[];
  totalAmount: string;
}

export type OrderCreatedEvent = BaseEvent<OrderCreatedPayload>;

export const ORDER_CREATED_EVENT_TYPE = KAFKA_TOPICS.ORDER_CREATED;
