import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcFailedPreconditionException extends GrpcException {
  constructor(message = 'Failed precondition') {
    super({
      code: status.FAILED_PRECONDITION,
      message,
      error: 'FAILED_PRECONDITION',
    });
  }
}
