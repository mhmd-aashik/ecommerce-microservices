import { ClientProviderOptions } from '@nestjs/microservices';
import { createGrpcClientOptions } from './grpc-client.options';
import {
  PRODUCT_PACKAGE,
  USER_PACKAGE,
  INVENTORY_PACKAGE,
} from './grpc-client.tokens';

type GrpcClientConfig = {
  name: string;
  packageName: string;
  protoPath: string;
  url: string;
};

function createGrpcClient(config: GrpcClientConfig): ClientProviderOptions {
  return {
    name: config.name,
    ...createGrpcClientOptions({
      packageName: config.packageName,
      protoPath: config.protoPath,
      url: config.url,
    }),
  };
}

export function createProductGrpcClient(): ClientProviderOptions {
  return createGrpcClient({
    name: PRODUCT_PACKAGE,
    packageName: 'product',
    protoPath: 'proto/product/product.proto',
    url: process.env.PRODUCT_GRPC_URL || 'localhost:50051',
  });
}

export function createUserGrpcClient(): ClientProviderOptions {
  return createGrpcClient({
    name: USER_PACKAGE,
    packageName: 'user',
    protoPath: 'proto/user/user.proto',
    url: process.env.USER_GRPC_URL || 'localhost:50056',
  });
}

export function createInventoryGrpcClient(): ClientProviderOptions {
  return createGrpcClient({
    name: INVENTORY_PACKAGE,
    packageName: 'inventory',
    protoPath: 'proto/inventory/inventory.proto',
    url: process.env.INVENTORY_GRPC_URL || 'localhost:50053',
  });
}
