import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import { KAFKA_CLIENT } from '../tokens/kafka.tokens';
import { BaseEvent } from '../events/base-event.interface';

@Injectable()
export class KafkaConsumerService implements OnModuleDestroy {
  private readonly consumers: Consumer[] = [];

  constructor(
    @Inject(KAFKA_CLIENT)
    private readonly kafka: Kafka,
  ) {}

  async subscribe<TPayload>(
    options: {
      groupId: string;
      topic: string;
      fromBeginning?: boolean;
    },
    handler: (
      event: BaseEvent<TPayload>,
      rawMessage: EachMessagePayload,
    ) => Promise<void>,
  ) {
    const consumer = this.kafka.consumer({
      groupId: options.groupId,
    });

    await consumer.connect();

    await consumer.subscribe({
      topic: options.topic,
      fromBeginning: options.fromBeginning ?? false,
    });

    await consumer.run({
      eachMessage: async (payload) => {
        const value = payload.message.value?.toString();

        if (!value) {
          return;
        }

        const event = JSON.parse(value) as BaseEvent<TPayload>;

        await handler(event, payload);
      },
    });

    this.consumers.push(consumer);
  }

  async onModuleDestroy() {
    await Promise.all(this.consumers.map((consumer) => consumer.disconnect()));
  }
}
