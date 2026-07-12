import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GRPC_TO_HTTP_STATUS } from '../constants/grpc-status-map';
import { CORRELATION_ID_HEADER } from '../middleware/correlation-id.middleware';

@Catch()
export class GrpcExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const correlationId =
      request.headers[CORRELATION_ID_HEADER]?.toString() ?? 'unknown';

    const errorResponse = this.buildErrorResponse(
      exception,
      request.url,
      correlationId,
    );

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(
    exception: unknown,
    path: string,
    correlationId: string,
  ) {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      return {
        statusCode: status,
        message: this.extractHttpMessage(response),
        error: HttpStatus[status],
        timestamp: new Date().toISOString(),
        path,
        correlationId,
      };
    }

    if (this.isGrpcError(exception)) {
      const status =
        GRPC_TO_HTTP_STATUS[exception.code] ?? HttpStatus.INTERNAL_SERVER_ERROR;

      return {
        statusCode: status,
        message: exception.details ?? 'Internal Server Error',
        error: HttpStatus[status],
        timestamp: new Date().toISOString(),
        path,
        correlationId,
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path,
      correlationId,
    };
  }

  private isGrpcError(exception: unknown): exception is {
    code: number;
    details?: string;
  } {
    return (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception &&
      typeof exception.code === 'number'
    );
  }

  private extractHttpMessage(response: string | object): string | string[] {
    if (typeof response === 'string') {
      return response;
    }

    if (
      typeof response === 'object' &&
      response !== null &&
      'message' in response
    ) {
      const message = (response as { message: string | string[] }).message;
      return message;
    }

    return 'Unexpected error';
  }
}
