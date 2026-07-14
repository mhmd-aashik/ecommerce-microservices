import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppLogger {
  constructor(private readonly logger: PinoLogger) {}

  setContext(context: string) {
    this.logger.setContext(context);
  }

  debug(message: string, data?: Record<string, unknown>) {
    this.logger.debug(data ?? {}, message);
  }

  info(message: string, data?: Record<string, unknown>) {
    this.logger.info(data ?? {}, message);
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.logger.warn(data ?? {}, message);
  }

  error(message: string, data?: Record<string, unknown>) {
    this.logger.error(data ?? {}, message);
  }
}
