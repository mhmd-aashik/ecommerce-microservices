import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

export const GRPC_TO_HTTP_STATUS: Record<number, HttpStatus> = {
  [status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
  [status.DEADLINE_EXCEEDED]: HttpStatus.GATEWAY_TIMEOUT,
  [status.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
  [status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
  [status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
  [status.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
  [status.FAILED_PRECONDITION]: HttpStatus.PRECONDITION_FAILED,
  [status.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
  [status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
};
