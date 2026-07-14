import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { createUserGrpcClient } from '@app/common';

@Module({
  imports: [ClientsModule.register([createUserGrpcClient()])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

// imports: [
//   ClientsModule.register([
//     {
//       name: PRODUCT_PACKAGE,
//       ...createGrpcClientOptions({
//         packageName: 'product',
//         protoPath: 'proto/product/product.proto',
//         url: process.env.PRODUCT_GRPC_URL || 'localhost:50051',
//       }),
//     },
//   ]),
// ],
