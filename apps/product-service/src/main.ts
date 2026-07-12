import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'product',
        protoPath: join(process.cwd(), 'proto/product/product.proto'),
        url: process.env.PRODUCT_SERVICE_URL || 'localhost:50051',
      },
    },
  );

  await app.listen();

  console.log('Product gRPC service running on localhost:50051');
}
void bootstrap();
