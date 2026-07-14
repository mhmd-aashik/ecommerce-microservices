import { status } from '@grpc/grpc-js';
import { GrpcException } from './grpc-exception';

export class GrpcPermissionDeniedException extends GrpcException {
  constructor(message = 'Permission denied') {
    super({
      code: status.PERMISSION_DENIED,
      message,
      error: 'PERMISSION_DENIED',
    });
  }
}
