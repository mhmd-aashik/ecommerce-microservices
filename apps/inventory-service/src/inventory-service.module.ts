import { Module } from '@nestjs/common';
import { InventoryServiceController } from './inventory-service.controller';
import { InventoryServiceService } from './inventory-service.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema, LoggerModule } from '@app/common';
import { DatabaseModule } from '@app/database';
import { KafkaModule } from '@app/kafka';
import { InventoryProductEventsConsumer } from './consumers/product-events.consumer';
import { ProductCreatedConsumer } from './events/consumers/product-created.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
    }),
    DatabaseModule.forRoot('INVENTORY_DATABASE_URL'),
    LoggerModule,
    KafkaModule,
  ],
  controllers: [InventoryServiceController],
  providers: [
    InventoryServiceService,
    InventoryProductEventsConsumer,
    ProductCreatedConsumer,
  ],
})
export class InventoryServiceModule {}
