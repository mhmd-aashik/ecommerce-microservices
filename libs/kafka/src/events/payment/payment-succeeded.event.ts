import { BaseEvent } from '../base-event.interface';
import { KAFKA_TOPICS } from '../../topics';

export interface PaymentSucceededPayload {
  paymentId: string;
  orderId: string;
  userId: string;
  amount: string;
  provider: string;
}

export type PaymentSucceededEvent = BaseEvent<PaymentSucceededPayload>;

export const PAYMENT_SUCCEEDED_EVENT_TYPE = KAFKA_TOPICS.PAYMENT_SUCCEEDED;
