import { BaseEvent } from '../base-event.interface';
import { KAFKA_TOPICS } from '../../topics';

export interface ProductCreatedPayload {
  productId: string;
  name: string;
  sku: string;
  price: string;
}

export type ProductCreatedEvent = BaseEvent<ProductCreatedPayload>;

export const PRODUCT_CREATED_EVENT_TYPE = KAFKA_TOPICS.PRODUCT_CREATED;
