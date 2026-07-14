import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcDeadlineExceededException extends GrpcException {
  constructor(message = 'Deadline exceeded') {
    super({
      code: status.DEADLINE_EXCEEDED,
      message,
      error: 'DEADLINE_EXCEEDED',
    });
  }
}
