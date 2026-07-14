import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  BaseEvent,
  KafkaConsumerService,
  KAFKA_TOPICS,
  ProductCreatedPayload,
} from '@app/kafka';
import { AppLogger } from '@app/common';

@Injectable()
export class ProductCreatedConsumer implements OnModuleInit {
  constructor(
    private readonly kafkaConsumer: KafkaConsumerService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(ProductCreatedConsumer.name);
  }

  async onModuleInit() {
    await this.kafkaConsumer.subscribe<ProductCreatedPayload>(
      {
        groupId: 'inventory-service',
        topic: KAFKA_TOPICS.PRODUCT_CREATED,
      },
      (event: BaseEvent<ProductCreatedPayload>) => {
        this.logger.info('Product created event received', {
          eventId: event.eventId,
          productId: event.payload.productId,
          sku: event.payload.sku,
          correlationId: event.correlationId,
        });
      },
    );
  }
}
