/* eslint-disable @typescript-eslint/require-await */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaConsumerService, KAFKA_TOPICS, BaseEvent } from '@app/kafka';

interface ProductCreatedPayload {
  productId: string;
  name: string;
  sku: string;
  price: string;
}

@Injectable()
export class InventoryProductEventsConsumer implements OnModuleInit {
  constructor(private readonly kafkaConsumer: KafkaConsumerService) {}

  async onModuleInit() {
    await this.kafkaConsumer.subscribe<ProductCreatedPayload>(
      {
        groupId: 'inventory-service',
        topic: KAFKA_TOPICS.PRODUCT_CREATED,
      },
      async (event: BaseEvent<ProductCreatedPayload>) => {
        console.log('Product created event received:', event.payload);

        // later:
        // create default inventory item
        // sync searchable stock info
      },
    );
  }
}
