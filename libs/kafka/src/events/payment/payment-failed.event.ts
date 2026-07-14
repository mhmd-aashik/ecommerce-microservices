import { BaseEvent } from '../base-event.interface';
import { KAFKA_TOPICS } from '../../topics';

export interface PaymentFailedPayload {
  paymentId: string;
  orderId: string;
  userId: string;
  amount: string;
  reason: string;
  provider: string;
}

export type PaymentFailedEvent = BaseEvent<PaymentFailedPayload>;

export const PAYMENT_FAILED_EVENT_TYPE = KAFKA_TOPICS.PAYMENT_FAILED;
