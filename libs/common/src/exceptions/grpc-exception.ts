import { RpcException } from '@nestjs/microservices';

export interface GrpcErrorPayload {
  code: number;
  message: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export class GrpcException extends RpcException {
  constructor(payload: GrpcErrorPayload) {
    super(payload);
  }
}
