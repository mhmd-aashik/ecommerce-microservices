import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GRPC_TO_HTTP_STATUS } from '../constants/grpc-status-map';

interface GrpcException {
  code?: number;
  details?: string;
}

function isGrpcException(value: unknown): value is GrpcException {
  return (
    typeof value === 'object' &&
    value !== null &&
    ('code' in value || 'details' in value)
  );
}

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (isGrpcException(exception)) {
      status =
        exception.code !== undefined
          ? (GRPC_TO_HTTP_STATUS[exception.code] ??
            HttpStatus.INTERNAL_SERVER_ERROR)
          : HttpStatus.INTERNAL_SERVER_ERROR;

      message = exception.details ?? message;
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: HttpStatus[status],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
