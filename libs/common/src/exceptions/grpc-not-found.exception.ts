import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcNotFoundException extends GrpcException {
  constructor(message = 'Resource not found') {
    super({
      code: status.NOT_FOUND,
      message,
      error: 'NOT_FOUND',
    });
  }
}
