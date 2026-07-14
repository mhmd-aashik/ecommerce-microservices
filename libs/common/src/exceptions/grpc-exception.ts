import { RpcException } from '@nestjs/microservices';

export interface GrpcErrorPayload {
  code: number;
  message: string;
}

export class GrpcException extends RpcException {
  constructor(payload: GrpcErrorPayload) {
    super(payload);
  }
}
