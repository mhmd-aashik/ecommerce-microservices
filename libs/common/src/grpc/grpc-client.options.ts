import { join } from 'path';
import { GrpcOptions, Transport } from '@nestjs/microservices';

export function createGrpcClientOptions(params: {
  packageName: string;
  protoPath: string;
  url: string;
}): GrpcOptions {
  return {
    transport: Transport.GRPC,
    options: {
      package: params.packageName,
      protoPath: join(process.cwd(), params.protoPath),
      url: params.url,
    },
  };
}
