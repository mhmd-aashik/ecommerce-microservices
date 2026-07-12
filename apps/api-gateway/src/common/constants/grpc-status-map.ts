import { HttpStatus } from '@nestjs/common';

export const GRPC_TO_HTTP_STATUS: Record<number, HttpStatus> = {
  3: HttpStatus.BAD_REQUEST,
  4: HttpStatus.GATEWAY_TIMEOUT,
  5: HttpStatus.NOT_FOUND,
  6: HttpStatus.CONFLICT,
  7: HttpStatus.FORBIDDEN,
  13: HttpStatus.INTERNAL_SERVER_ERROR,
  14: HttpStatus.SERVICE_UNAVAILABLE,
  16: HttpStatus.UNAUTHORIZED,
};
