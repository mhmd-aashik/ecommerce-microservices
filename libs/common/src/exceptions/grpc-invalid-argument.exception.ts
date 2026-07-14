import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcInvalidArgumentException extends GrpcException {
  constructor(message = 'Invalid argument') {
    super({
      code: status.INVALID_ARGUMENT,
      message,
      error: 'INVALID_ARGUMENT',
    });
  }
}
