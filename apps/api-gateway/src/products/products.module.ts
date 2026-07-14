import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { createGrpcClientOptions, PRODUCT_PACKAGE } from '@app/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_PACKAGE,
        ...createGrpcClientOptions({
          packageName: 'product',
          protoPath: 'proto/product/product.proto',
          url: process.env.PRODUCT_GRPC_URL || 'localhost:50051',
        }),
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
