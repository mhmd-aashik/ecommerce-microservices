import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcUnauthenticatedException extends GrpcException {
  constructor(message = 'Unauthenticated') {
    super({
      code: status.UNAUTHENTICATED,
      message,
      error: 'UNAUTHENTICATED',
    });
  }
}
