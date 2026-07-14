import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import type { Producer } from 'kafkajs';
import { randomUUID } from 'crypto';
import { KAFKA_PRODUCER } from '../tokens/kafka.tokens';
import { BaseEvent } from '../events/base-event.interface';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(KAFKA_PRODUCER)
    private readonly producer: Producer,
  ) {}

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async publish<TPayload>(
    topic: string,
    payload: TPayload,
    options?: {
      key?: string;
      correlationId?: string;
      eventType?: string;
    },
  ) {
    const event: BaseEvent<TPayload> = {
      eventId: randomUUID(),
      eventType: options?.eventType ?? topic,
      occurredAt: new Date().toISOString(),
      correlationId: options?.correlationId,
      payload,
    };

    await this.producer.send({
      topic,
      messages: [
        {
          key: options?.key,
          value: JSON.stringify(event),
          headers: {
            correlationId: options?.correlationId ?? '',
          },
        },
      ],
    });

    return event;
  }
}
