import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcAlreadyExistsException extends GrpcException {
  constructor(message = 'Resource already exists') {
    super({
      code: status.ALREADY_EXISTS,
      message,
      error: 'ALREADY_EXISTS',
    });
  }
}
