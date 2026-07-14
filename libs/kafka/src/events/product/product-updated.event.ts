import { BaseEvent } from '../base-event.interface';
import { KAFKA_TOPICS } from '../../topics';

export interface ProductUpdatedPayload {
  productId: string;
  name?: string;
  sku?: string;
  price?: string;
  isActive?: boolean;
}

export type ProductUpdatedEvent = BaseEvent<ProductUpdatedPayload>;

export const PRODUCT_UPDATED_EVENT_TYPE = KAFKA_TOPICS.PRODUCT_UPDATED;
