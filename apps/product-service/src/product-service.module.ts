import { Module } from '@nestjs/common';
import { ProductServiceController } from './product-service.controller';
import { ProductServiceService } from './product-service.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from '@app/common';
import { DatabaseModule } from '@app/database';
import { HealthController } from './health/health.controller';
import { KafkaModule } from '@app/kafka';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
    }),
    DatabaseModule.forRoot('PRODUCT_DATABASE_URL'),
    KafkaModule,
  ],
  controllers: [ProductServiceController, HealthController],
  providers: [ProductServiceService],
})
export class ProductServiceModule {}
