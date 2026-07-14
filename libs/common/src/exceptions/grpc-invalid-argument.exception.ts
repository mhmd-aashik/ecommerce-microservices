import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcInvalidArgumentException extends GrpcException {
  constructor(message: string) {
    super({
      code: status.INVALID_ARGUMENT,
      message,
    });
  }
}
