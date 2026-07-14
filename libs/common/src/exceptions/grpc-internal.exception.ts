import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcInternalException extends GrpcException {
  constructor(message = 'Internal server error') {
    super({
      code: status.INTERNAL,
      message,
      error: 'INTERNAL',
    });
  }
}
