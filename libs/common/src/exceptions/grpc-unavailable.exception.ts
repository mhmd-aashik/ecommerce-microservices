import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcUnavailableException extends GrpcException {
  constructor(message = 'Service unavailable') {
    super({
      code: status.UNAVAILABLE,
      message,
      error: 'UNAVAILABLE',
    });
  }
}
