import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { createProductGrpcClient } from '@app/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [ClientsModule.register([createProductGrpcClient()])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
