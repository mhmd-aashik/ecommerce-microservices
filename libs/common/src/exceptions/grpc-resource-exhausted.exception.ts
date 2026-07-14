import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcResourceExhaustedException extends GrpcException {
  constructor(message = 'Resource exhausted') {
    super({
      code: status.RESOURCE_EXHAUSTED,
      message,
      error: 'RESOURCE_EXHAUSTED',
    });
  }
}
