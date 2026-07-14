import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  BaseEvent,
  KafkaConsumerService,
  KAFKA_TOPICS,
  ProductCreatedPayload,
} from '@app/kafka';
import { AppLogger } from '@app/common';
import { InventoryServiceService } from '../../inventory-service.service';

@Injectable()
export class ProductCreatedConsumer implements OnModuleInit {
  constructor(
    private readonly kafkaConsumer: KafkaConsumerService,
    private readonly logger: AppLogger,
    private readonly inventoryService: InventoryServiceService,
  ) {
    this.logger.setContext(ProductCreatedConsumer.name);
  }

  async onModuleInit() {
    await this.kafkaConsumer.subscribe<ProductCreatedPayload>(
      {
        groupId: 'inventory-service',
        topic: KAFKA_TOPICS.PRODUCT_CREATED,
      },
      async (event: BaseEvent<ProductCreatedPayload>) => {
        this.logger.info('Product created event received', {
          eventId: event.eventId,
          productId: event.payload.productId,
          sku: event.payload.sku,
          correlationId: event.correlationId,
        });

        const item =
          await this.inventoryService.createDefaultInventoryForProduct(
            event.payload.productId,
          );

        this.logger.info('Default inventory item ensured', {
          inventoryItemId: item.id,
          productId: event.payload.productId,
        });
      },
    );
  }
}
