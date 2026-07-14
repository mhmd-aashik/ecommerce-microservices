export interface BaseEvent<TPayload> {
  eventId: string;
  eventType: string;
  occurredAt: string;
  correlationId?: string;
  payload: TPayload;
}
